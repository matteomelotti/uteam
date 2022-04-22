import localDatabase from '../../common/localDatabase.js'

const schema = new localDatabase.Schema({
  firstName: String,
  lastName: String,
  email: String,
  language: String,
  password: String,
  role: String,
  active: {
    type: Boolean,
    default: false
  },
  confirmationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  sso: String,
  unreadMessage: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

const User = localDatabase.model('User', schema, 'user')

export default User
