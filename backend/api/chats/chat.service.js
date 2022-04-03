import Chat from './chat.model.js'
import BaseService from '../../services/base.service.js'

class ChatService extends BaseService {
  getModel () {
    return Chat
  }

  async create (data) {
    const chat = new Chat(data)
    await chat.save()

    return chat
  }
}

export default new ChatService()
