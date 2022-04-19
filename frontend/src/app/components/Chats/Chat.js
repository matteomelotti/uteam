import React from 'react'
import { useHistory } from 'react-router-dom'
import { calculateTime } from '../../../libs/utils'
import { CListGroupItem } from '@coreui/react'
import useParamsQuery from 'app/components/common/useQuery'
import CIcon from '@coreui/icons-react'

function Chat ({ chat, connectedUsers }) {
  const history = useHistory()
  const query = useParamsQuery()
  const isOnline = connectedUsers.length >= 0 && connectedUsers.filter(user => user.userId === chat.messagesWithId).length > 0
  return (
    <CListGroupItem
      component='a'
      href='#'
      className={`${query.get('chat') === chat.messagesWithId ? 'active' : ''}`}
      onClick={() =>
        history.push(`/chats?chat=${chat.messagesWithId}`, undefined, {
          shallow: true
        })}
    >
      {/* {chat.profilePicUrl} */}
      <div className='d-flex w-100 justify-content-between'>
        <h5 className='mb-1'>{chat.firstName} {chat.lastName} {isOnline && <CIcon name='cil-circle' className='online-chat-user' alt='CoreUI Icons Moon' />}</h5>
        <small>{calculateTime(chat.date)}</small>
      </div>
      <p className='mb-1'>
        {chat.lastMessage.length > 20 ? `${chat.lastMessage.substring(0, 20)} ...` : chat.lastMessage}
      </p>
    </CListGroupItem>
  )
}

export default Chat
