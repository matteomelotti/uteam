import { CCol, CRow, CListGroup } from '@coreui/react'
import useParamsQuery from 'app/components/common/useQuery'
import Loader from 'app/components/Loader'
import { ChatsListQuery } from 'api/queries'
import Chat from '../../components/Chats/Chat'
import { useEffect, useRef, useState, useContext } from 'react'
import { useQuery } from 'react-query'
// import io from 'socket.io-client'
import {
  user as _user,
  connectedUsers as _connectedUsers,
  unreadMessages as _unreadMessages
} from '../../../state/index.js'
import { useRecoilValue, useRecoilState } from 'recoil'
import Banner from '../../components/Messages/Banner'
import Message from '../../components/Messages/Message'
import MessageInputField from '../../components/Messages/MessageInputField'
import { getUserInfo, newMsgSound } from '../../../libs/utils'
import ChatListSearch from '../../components/Chats/ChatListSearch'
import { useTranslation } from 'react-i18next'
import { SocketContext } from 'context/socket'

const scrollDivToBottom = divRef =>
  divRef && divRef.current && divRef.current.scrollIntoView({ behaviour: 'smooth' })

const Chats = () => {
  const { t } = useTranslation()
  const user = useRecoilValue(_user)
  const [connectedUsers] = useRecoilValue(_connectedUsers)
  const socket = useContext(SocketContext)
  const [messages, setMessages] = useState([])
  const [bannerData, setBannerData] = useState({ name: '', profilePicUrl: '' })
  const query = useParamsQuery()
  const [chats, setChats] = useState([])
  const [unreadMessages, setUnreadMessages] = useRecoilState(_unreadMessages)

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
    setUnreadMessages(false)
    const loadMessages = () => {
      socket.emit('loadMessages', {
        userId: user._id,
        messagesWith: chatParam
      })

      socket.on('messagesLoaded', async ({ chat }) => {
        setMessages(chat.messages)
        setBannerData({
          firstName: chat.messagesWith.firstName,
          lastName: chat.messagesWith.lastName
          // profilePicUrl: chat.messagesWith.profilePicUrl
        })

        openChatId.current = chat.messagesWith._id
        divRef.current && scrollDivToBottom(divRef)
      })

      socket.on('noChatFound', async () => {
        const { name, profilePicUrl } = await getUserInfo(chatParam)

        setBannerData({ name, profilePicUrl })
        setMessages([])

        openChatId.current = chatParam
      })
    }

    if (socket && chatParam) loadMessages()
  }, [chatParam, user])

  const sendMsg = msg => {
    if (socket) {
      socket.emit('sendNewMsg', {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg
      })
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('msgSent', ({ newMsg }) => {
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

      socket.on('newMsgReceived', async ({ newMsg }) => {
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
          const { firstName, profilePicUrl, lastName } = await getUserInfo(newMsg.sender)
          senderName = firstName

          const newChat = {
            messagesWithId: newMsg.sender,
            firstName: firstName,
            lastName: lastName,
            profilePicUrl,
            lastMessage: newMsg.msg,
            date: newMsg.date
          }

          setChats(prev => {
            const previousChat = Boolean(
              prev.find(chat => chat.messagesWithId === newMsg.sender)
            )

            if (previousChat) {
              return [
                newChat,
                ...prev.filter(chat => chat.messagesWithId !== newMsg.sender)
              ]
            } else {
              return [newChat, ...prev]
            }
          })
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

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      <CRow>
        <>
          <CCol lg={3} className='mb-5'>
            <div style={{ marginBottom: '10px' }}>
              <ChatListSearch chats={chats} setChats={setChats} />
            </div>
            {chats.length > 0
              ? (
                <CListGroup>
                  {chats.map((chat, i) => (
                    <Chat
                      connectedUsers={connectedUsers}
                      key={chat.messagesWithId}
                      chat={chat}
                    />
                  ))}
                </CListGroup>
                )
              : ''}
          </CCol>
          <CCol lg={9}>
            {chatParam && chats
              ? (
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
                </>)
              : (
                <>
                  <div
                    style={{
                      overflow: 'auto',
                      overflowX: 'hidden',
                      maxHeight: '35rem',
                      height: '35rem',
                      backgroundColor: 'whitesmoke',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h3>{t('chatsPage.chooseChat')}</h3>
                  </div>
                </>)}
          </CCol>
        </>
      </CRow>
    </>
  )
}

export default Chats
