import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { calculateTime } from '../../../libs/utils'
import { CCard, CCardBody } from '@coreui/react'

function Chat ({ chat }) {
  const history = useHistory()
  const query = useQuery()

  return (
    <>
      <CCard>
        <CCardBody>
          <div
            className={`${query.get('chat') === chat.messagesWithId} ? 'active' : ''}`}
            onClick={() =>
              history.push(`/chats?chat=${chat.messagesWithId}`, undefined, {
                shallow: true
              })}
          >
            <div>
              <p>{chat.profilePicUrl}</p>
              <p>{chat.name}{' '}</p>
              <p>{calculateTime(chat.date)}</p>
              <p>{chat.lastMessage.length > 20
                ? `${chat.lastMessage.substring(0, 20)} ...`
                : chat.lastMessage}
              </p>
            </div>
          </div>
        </CCardBody>
      </CCard>
      <hr />
    </>
  )
}

function useQuery () {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

export default Chat
