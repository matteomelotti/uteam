import localDatabase from '../../common/localDatabase.js'

const schema = new localDatabase.Schema({
  title: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true })

const Ticket = localDatabase.model('Ticket', schema, 'ticket')

export default Ticket
