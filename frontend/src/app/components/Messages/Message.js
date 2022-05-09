import React, { useState } from 'react'
import { calculateTime } from '../../../libs/utils'

function Message ({ message, user, deleteMsg, bannerProfilePic, divRef }) {
  const [deleteIcon, showDeleteIcon] = useState(false)

  const ifYouSender = message.sender === user._id

  return (
    <div className='bubbleWrapper' ref={divRef}>
      <div
        className={ifYouSender ? 'inlineContainer own' : 'inlineContainer'}
        onClick={() => ifYouSender && showDeleteIcon(!deleteIcon)}
      >
        {/* <img
          className='inlineIcon'
          src={ifYouSender ? user.profilePicUrl : bannerProfilePic}
        /> */}

        <div className={ifYouSender ? 'ownBubble own' : 'otherBubble other'}>
          {message.msg}
        </div>

        {deleteIcon && (
          <p>delete message</p>
        )}
      </div>

      <span className={ifYouSender ? 'own' : 'other'}>{calculateTime(message.date)}</span>
    </div>
  )
}

export default Message
