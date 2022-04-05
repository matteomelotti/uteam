import moment from 'moment'
import Moment from 'react-moment'

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

export { formatMoney, calculateTime }
