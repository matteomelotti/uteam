import moment from 'moment'
import Moment from 'react-moment'
import Axios from 'libs/axios'

const formatMoney = (locale, currency = 'EUR', number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

const calculateTime = createdAt => {
  const today = moment(Date.now())
  const postDate = moment(createdAt)
  const diffInHours = today.diff(postDate, 'hours')

  if (diffInHours < 24) {
    return (
      <>
        Today <Moment format='hh:mm A'>{createdAt}</Moment>
      </>
    )
  } else if (diffInHours > 24 && diffInHours < 36) {
    return (
      <>
        Yesterday <Moment format='hh:mm A'>{createdAt}</Moment>
      </>
    )
  } else if (diffInHours > 36) {
    return <Moment format='DD/MM/YYYY hh:mm A'>{createdAt}</Moment>;
  }
}

const newMsgSound = senderName => {
  const sound = new Audio('/light.mp3')

  sound && sound.play()

  if (senderName) {
    document.title = `New message from ${senderName}`

    if (document.visibilityState === 'visible') {
      setTimeout(() => {
        document.title = 'Messages'
      }, 5000)
    }
  }
}

const getUserInfo = async userToFindId => {
  try {
    const res = await Axios.authenticated().get(`/chats/user/${userToFindId}`)

    return { firstName: res.data.firstName, profilePicUrl: res.data.profilePicUrl, lastName: res.data.lastName }
  } catch (error) {
    console.error(error)
  }
}

export {
  formatMoney,
  calculateTime,
  newMsgSound,
  getUserInfo
}
