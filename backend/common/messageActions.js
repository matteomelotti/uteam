import Chat from '../api/chats/chat.model.js'
import User from '../api/users/user.model.js'

const loadMessages = async (userId, messagesWith) => {
  try {
    const user = await Chat.findOne({
      user: userId
    }).populate('chats.messagesWith')

    const chat = user.chats.find(
      chat => chat.messagesWith._id.toString() === messagesWith
    )

    if (!chat) {
      return {
        error: 'No chat found'
      }
    }

    return {
      chat
    }
  } catch (error) {
    console.log(error)
    return {
      error
    }
  }
}

const sendMsg = async (userId, msgSendToUserId, msg) => {
  try {
    // LOGGED IN USER (SENDER)
    const user = await Chat.findOne({
      user: userId
    })

    // RECEIVER
    const msgSendToUser = await Chat.findOne({
      user: msgSendToUserId
    })

    const newMsg = {
      sender: userId,
      receiver: msgSendToUserId,
      msg,
      date: Date.now()
    }
    const previousChat = user.chats.find(
      chat => chat.messagesWith.toString() === msgSendToUserId
    )
    if (previousChat) {
      previousChat.messages.push(newMsg)
      await user.save()
    } else {
      const newChat = {
        messagesWith: msgSendToUserId,
        messages: [newMsg]
      }
      user.chats.unshift(newChat)
      await user.save()
    }

    const previousChatForReceiver = msgSendToUser.chats.find(
      chat => chat.messagesWith.toString() === userId
    )

    if (previousChatForReceiver) {
      previousChatForReceiver.messages.push(newMsg)
      await msgSendToUser.save()
    } else {
      const newChat = {
        messagesWith: userId,
        messages: [newMsg]
      }
      msgSendToUser.chats.unshift(newChat)
      await msgSendToUser.save()
    }

    return {
      newMsg
    }
  } catch (error) {
    console.error(error)
    return {
      error
    }
  }
}

const setMsgToUnread = async userId => {
  try {
    const user = await User.findById(userId)

    if (!user.unreadMessage) {
      user.unreadMessage = true
      await user.save()
      return user
    } else {
      return user
    }
  } catch (error) {
    console.error(error)
  }
}

export {
  loadMessages,
  sendMsg,
  setMsgToUnread
}
