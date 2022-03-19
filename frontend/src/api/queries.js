import Axios from 'libs/axios'

const Me = async (key) => {
  const result = await Axios.authenticated().get('/users/me?withAccount=true')
  return result
}

const TicketsListQuery = async () => {
  const result = await Axios.authenticated().get('/tickets')
  return result
}

export {
  Me,
  TicketsListQuery
}
