import { useTranslation } from 'react-i18next'

const TranslateMessage = ({ message }) => {
  const { t } = useTranslation()
  if (message !== ':empty!') {
    return (
      `${t(message)}`
    )
  }

  return <></>
}

export default TranslateMessage
