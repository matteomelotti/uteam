import Axios from 'libs/axios'
import Storage from 'libs/storage'
import {
  JWT_TOKEN,
  SIGNUP_WITH_ACTIVATE
} from 'config'

const Logout = async () => {
  Storage.deleteKey(JWT_TOKEN)
}

const Login = async (data) => {
  const result = await Axios.base().post('/auth/login', data)
  Storage.setItem(JWT_TOKEN, result.data.token)
  return result
}

const ForgotPassword = async (data) => {
  const result = await Axios.base().post('/auth/send-forgot-password-link', data)
  return result
}

const ResetPassword = async (data) => {
  const result = await Axios.base().post('/auth/reset-password', data)
  return result
}

const ResendActivation = async (data) => {
  const result = await Axios.base().post('/auth/send-activation-link', data)
  return result
}

const Register = async (data) => {
  const result = await Axios.base().post('/auth/signup', data)
  if (SIGNUP_WITH_ACTIVATE) {
    Storage.setItem(JWT_TOKEN, result.data.token)
  }
  return result
}

const Activate = async (data) => {
  const result = await Axios.base().post('/auth/activate', data)
  return result
}

const ChangePassword = async (data) => {
  const result = await Axios.authenticated().put('/users/me/change-password', data)
  return result
}

const UpdateMe = async (data) => {
  const result = await Axios.authenticated().put('/users/me', data)
  return result
}

const TicketCreate = async (data) => {
  const result = await Axios.authenticated().post('/tickets', data)
  return result
}

const TicketEdit = async (data) => {
  const result = await Axios.authenticated().put(`/tickets/${data.id}`, data)
  return result
}

const TicketDelete = async (id) => {
  const result = await Axios.authenticated().delete(`/tickets/${id}`)
  return result
}

const TicketComplete = async (id) => {
  const result = await Axios.authenticated().put(`/tickets/${id}/complete`)
  return result
}

export {
  Logout,
  Login,
  ForgotPassword,
  ResetPassword,
  ResendActivation,
  Register,
  Activate,
  ChangePassword,
  UpdateMe,
  TicketCreate,
  TicketEdit,
  TicketDelete,
  TicketComplete
}
