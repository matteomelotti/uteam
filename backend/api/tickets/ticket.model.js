import localDatabase from '../../common/localDatabase.js';

const schema = new localDatabase.Schema(
  {
    title: String,
    completed: { type: Boolean, default: false },
    assignedTo: {
      type: localDatabase.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Ticket = localDatabase.model('Ticket', schema, 'ticket');

export default Ticket;
