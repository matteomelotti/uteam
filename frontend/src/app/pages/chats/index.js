// import { useState } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import Loader from 'app/components/Loader'
import { ChatsListQuery } from 'api/queries'
// import { useParams } from 'react-router-dom'
import Chat from './Chat'
import { useEffect } from 'react'

const Chats = () => {
  const history = useHistory()
  // const [messages, setMessages] = useState([])
  // const { searchParams } = useParams()

  useEffect(() => {
    if (data?.data?.length > 0) {
      history.push(`/chats?chat=${data.data[0].messagesWithId}`, undefined, {
        shallow: true
      })
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
                  <Chat key={chat.messagesWithId} chat={chat} />
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
