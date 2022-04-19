import { CCol, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import useParamsQuery from 'app/components/common/useQuery'
import Loader from 'app/components/Loader'
import { ChatsListQuery } from 'api/queries'
import Chat from '../../components/Chats/Chat'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import io from 'socket.io-client'
import { user as _user } from '../../../state/index.js'
import { useRecoilValue } from 'recoil'
import Banner from '../../components/Messages/Banner'
import Message from '../../components/Messages/Message'
import MessageInputField from '../../components/Messages/MessageInputField'
import { getUserInfo, newMsgSound } from '../../../libs/utils'
import ChatListSearch from '../../components/Chats/ChatListSearch'

const scrollDivToBottom = divRef =>
  divRef.current !== null && divRef.current.scrollIntoView({ behaviour: 'smooth' })

const Chats = () => {
  const history = useHistory()
  const user = useRecoilValue(_user)
  const [connectedUsers, setConnectedUsers] = useState([])
  const socket = useRef()
  const [messages, setMessages] = useState([])
  const [bannerData, setBannerData] = useState({ name: '', profilePicUrl: '' })
  const query = useParamsQuery()
  const [chats, setChats] = useState([])

  const chatParam = query.get('chat')
  // ref for persisting the state of query string in the url
  const openChatId = useRef('')
  const divRef = useRef('')

  const { status, isLoading, error, data } = useQuery('chats', ChatsListQuery, {
    retry: false,
    onSuccess: (data) => {
      setChats(data.data)
    }
  })

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('http://localhost:3000')
    }
    if (socket.current) {
      socket.current.emit('join', { userId: user.id })
      socket.current.on('connectedUsers', ({ users }) => {
        users.length > 0 && setConnectedUsers(users)
      })
    }
    // if (data?.data?.length > 0 && !chatParam) {
    //   history.push(`/chats?chat=${data.data[0].messagesWithId}`, undefined, {
    //     shallow: true
    //   })
    // }

    return () => {
      if (socket.current) {
        socket.current.emit('disconnectUser')
        socket.current.off()
      }
    }
  }, [])

  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit('loadMessages', {
        userId: user.id,
        messagesWith: chatParam
      })

      socket.current.on('messagesLoaded', async ({ chat }) => {
        setMessages(chat.messages)
        setBannerData({
          firstName: chat.messagesWith.firstName,
          lastName: chat.messagesWith.lastName
          // profilePicUrl: chat.messagesWith.profilePicUrl
        })

        openChatId.current = chat.messagesWith._id
        divRef.current && scrollDivToBottom(divRef)
      })

      socket.current.on('noChatFound', async () => {
        const { name, profilePicUrl } = await getUserInfo(chatParam)

        setBannerData({ name, profilePicUrl })
        setMessages([])

        openChatId.current = chatParam
      })
    }

    if (socket.current && chatParam) loadMessages()
  }, [chatParam])

  const sendMsg = msg => {
    if (socket.current) {
      socket.current.emit('sendNewMsg', {
        userId: user.id,
        msgSendToUserId: openChatId.current,
        msg
      })
    }
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msgSent', ({ newMsg }) => {
        if (newMsg.receiver === openChatId.current) {
          setMessages(prev => [...prev, newMsg])

          setChats(prev => {
            const previousChat = prev.find(
              chat => chat.messagesWithId === newMsg.receiver
            )

            previousChat.lastMessage = newMsg.msg
            previousChat.date = newMsg.date

            return [...prev]
          })
        }
      })

      socket.current.on('newMsgReceived', async ({ newMsg }) => {
        let senderName

        // WHEN CHAT WITH SENDER IS CURRENTLY OPENED INSIDE YOUR BROWSER
        if (newMsg.sender === openChatId.current) {
          setMessages(prev => [...prev, newMsg])

          setChats(prev => {
            const previousChat = prev.find(
              chat => chat.messagesWithId === newMsg.sender
            )
            previousChat.lastMessage = newMsg.msg
            previousChat.date = newMsg.date

            senderName = previousChat.name

            return [...prev]
          })
        } else {
          const ifPreviouslyMessaged =
            chats.filter(chat => chat.messagesWithId === newMsg.sender).length > 0

          if (ifPreviouslyMessaged) {
            setChats(prev => {
              const previousChat = prev.find(
                chat => chat.messagesWithId === newMsg.sender
              )
              previousChat.lastMessage = newMsg.msg
              previousChat.date = newMsg.date

              senderName = previousChat.name

              return [
                previousChat,
                ...prev.filter(chat => chat.messagesWithId !== newMsg.sender)
              ]
            })
          } else {
            const { name, profilePicUrl } = await getUserInfo(newMsg.sender)
            senderName = name

            const newChat = {
              messagesWithId: newMsg.sender,
              name,
              profilePicUrl,
              lastMessage: newMsg.msg,
              date: newMsg.date
            }
            setChats(prev => [newChat, ...prev])
          }
        }

        newMsgSound(senderName)
      })
    }
  }, [])

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef)
  }, [messages])

  useEffect(() => {
    if (status === 'success') {
      setChats(data.data)
    }
  }, [status, data])

  console.log('chats', chats)

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      <CRow>
        {chats.length > 0
          ? (
            <>
              <CCol lg={3}>
                <div style={{ marginBottom: '10px' }}>
                  <ChatListSearch chats={chats} setChats={setChats} />
                </div>
                {chats.map((chat, i) => (
                  <Chat
                    connectedUsers={connectedUsers}
                    key={chat.messagesWithId}
                    chat={chat}
                  />
                ))}
              </CCol>
              <CCol lg={9}>
                {chatParam && (
                  <>
                    <div
                      style={{
                        overflow: 'auto',
                        overflowX: 'hidden',
                        maxHeight: '35rem',
                        height: '35rem',
                        backgroundColor: 'whitesmoke'
                      }}
                    >
                      <div style={{ position: 'sticky', top: '0' }}>
                        <Banner bannerData={bannerData} />
                      </div>

                      {messages.length > 0 &&
                        messages.map((message, i) => (
                          <Message
                            divRef={divRef}
                            key={i}
                            bannerProfilePic={bannerData.profilePicUrl}
                            message={message}
                            user={user}
                            // deleteMsg={deleteMsg}
                          />
                        ))}
                    </div>

                    <MessageInputField sendMsg={sendMsg} />
                  </>
                )}
              </CCol>
            </>
            )
          : ''}
      </CRow>
    </>
  )
}

export default Chats
