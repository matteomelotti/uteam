import localDatabase from '../../common/localDatabase.js'

const schema = new localDatabase.Schema({
  user: { type: localDatabase.Schema.Types.ObjectId, ref: 'User' },

  chats: [
    {
      messagesWith: { type: localDatabase.Schema.Types.ObjectId, ref: 'User' },
      messages: [
        {
          msg: { type: String, required: true },
          sender: { type: localDatabase.Schema.Types.ObjectId, ref: 'User', required: true },
          receiver: { type: localDatabase.Schema.Types.ObjectId, ref: 'User', required: true },
          date: { type: Date }
        }
      ]
    }
  ]
})

const Chat = localDatabase.model('Chat', schema, 'chat')

export default Chat
