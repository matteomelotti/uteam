// import ChatService from './ticket.service.js'
// import ChatValidator from './ticket.validator.js'
import Chat from './chat.model.js'
import User from '../users/user.model.js'

class Controller {
  async index (req, res) {
    try {
      const userId = req.user._id
      const user = await Chat.findOne({ user: userId }).populate('chats.messagesWith')

      let chatsToBeSent = []
      if (user.chats.length > 0) {
        chatsToBeSent = await user?.chats?.map(chat => ({
          messagesWithId: chat?.messagesWith._id,
          firstName: chat?.messagesWith.firstName,
          lastName: chat?.messagesWith.lastName,
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

  async userToFind (req, res) {
    try {
      const user = await User.findById(req.params.userToFindId)

      if (!user) {
        return res.status(404).send('No User found')
      }

      return res.json({ firstName: user.firstName, lastName: user.lastName }) // future usage, profilePicUrl: user.profilePicUrl })
    } catch (error) {
      console.error(error)
      return res.status(500).send('Server Error')
    }
  }
}
export default new Controller()
