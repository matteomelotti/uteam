// import ChatService from './ticket.service.js'
// import ChatValidator from './ticket.validator.js'
import Chat from './chat.model.js'

class Controller {
  async index (req, res) {
    try {
      const userId = req.user._id
      const user = await Chat.findOne({ user: userId }).populate('chats.messagesWith')

      let chatsToBeSent = []
      if (user.chats.length > 0) {
        chatsToBeSent = await user?.chats?.map(chat => ({
          messagesWithId: chat?.messagesWith._id,
          name: chat?.messagesWith.firstName,
          email: chat?.messagesWith.email,
          // profilePicUrl: chat?.messagesWith?.profilePicUrl,
          lastMessage: chat?.messages[chat?.messages?.length - 1].msg,
          date: chat?.messages[chat?.messages?.length - 1].date
        }))
      }
      return res.json(chatsToBeSent)
    } catch (error) {
      console.error(error)
      return res.status(500).send('Server Error')
    }
  }
}
export default new Controller()
