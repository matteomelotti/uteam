import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import useParamsQuery from 'app/components/common/useQuery'
import Loader from 'app/components/Loader'
import { ChatsListQuery } from 'api/queries'
import Chat from './Chat'
import { useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import io from 'socket.io-client'
import { user as _user } from '../../../state/index.js'
import { useRecoilState, useRecoilValue } from 'recoil'

const Chats = () => {
  const history = useHistory()
  // const [messages, setMessages] = useState([])
  // const { searchParams } = useParams()
  const user = useRecoilValue(_user)
  const [connectedUsers, setConnectedUsers] = useState([])
  const socket = useRef()
  const query = useParamsQuery()
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
    if (data?.data?.length > 0 && !query.get('chat')) {
      history.push(`/chats?chat=${data.data[0].messagesWithId}`, undefined, {
        shallow: true
      })
    }

    return () => {
      if (socket.current) {
        socket.current.emit('disconnect')
        socket.current.off()
      }
    }
  }, [])

  const { isLoading, error, data } = useQuery('chats', ChatsListQuery, {
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <>
      <CRow>
        {data?.data?.length > 0
          ? (
            <>
              <CCol lg={3}>
                {data?.data?.map((chat, i) => (
                  <Chat
                    connectedUsers={connectedUsers}
                    key={chat.messagesWithId}
                    chat={chat}
                  />
                ))}
              </CCol>
              <CCol lg={9}>
                <CCard>
                  <CCardBody>
                    <p>messages</p>
                  </CCardBody>
                </CCard>
                {/* {searchParams.message && (
                  <>
                    <div
                      style={{
                        overflow: "auto",
                        overflowX: "hidden",
                        maxHeight: "35rem",
                        height: "35rem",
                        backgroundColor: "whitesmoke"
                      }}
                    >
                      <div style={{ position: "sticky", top: "0" }}>
                        <p>text</p>
                      </div>

                      {messages.length > 0 &&
                        messages.map((message, i) => (
                          <p>message</p>
                        ))}
                    </div>

                    <p>input field</p>
                  </>
                )} */}
              </CCol>
            </>
            )
          : ''}
      </CRow>
    </>
  )
}

export default Chats
