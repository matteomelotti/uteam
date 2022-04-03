import { CCard, CCardBody, CCol, CRow } from '@coreui/react'
// import { useState } from 'react'
import { useQuery } from 'react-query'
import Loader from 'app/components/Loader'
import { ChatsListQuery } from 'api/queries'
// import { useParams } from 'react-router-dom'

const Chats = () => {
  // const [messages, setMessages] = useState([])
  // const { searchParams } = useParams()

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
                <CCard>
                  <CCardBody>
                    {data?.data?.map((chat, i) => (
                      <div key={chat.messagesWithId}>
                        <p>{chat.name}</p>
                        <p>{chat.email}</p>
                        <p>{chat.lastMessage}</p>
                        <p>{chat.date}</p>
                      </div>
                    ))}
                  </CCardBody>
                </CCard>
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
