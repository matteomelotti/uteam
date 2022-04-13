import Chat from '../api/chats/chat.model.js'

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

export {
  loadMessages
}
