import React from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateTime } from '../../../libs/utils'
import { CListGroupItem } from '@coreui/react'
import useParamsQuery from 'app/components/common/useQuery'
import CIcon from '@coreui/icons-react'
import {
  cilCircle
} from '@coreui/icons'

function Chat ({ chat, connectedUsers }) {
  const navigate = useNavigate()
  const query = useParamsQuery()
  const isOnline = connectedUsers.length >= 0 && connectedUsers.filter(user => user.userId === chat.messagesWithId).length > 0

  return (
    <CListGroupItem
      component='a'
      href='#'
      className={`${query.get('chat') === chat.messagesWithId ? 'active' : ''}`}
      onClick={() => navigate(`/chats?chat=${chat.messagesWithId}`, { replace: true })}
    >
      {/* {chat.profilePicUrl} */}
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{chat.firstName} {chat.lastName} {isOnline && <CIcon icon={cilCircle} className='online-chat-user' />}
          {/*  */}
        </h5>
        <small>{calculateTime(chat.date)}</small>
      </div>
      <p className='mb-1'>
        {chat.lastMessage.length > 20 ? `${chat.lastMessage.substring(0, 20)} ...` : chat.lastMessage}
      </p>
    </CListGroupItem>
  )
}

export default Chat
