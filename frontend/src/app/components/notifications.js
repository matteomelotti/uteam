import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react'
import { useRecoilValue } from 'recoil'
import {
  notifications as _notifications
} from '../../state'

const Notifications = () => {
  const notifications = useRecoilValue(_notifications)

  return (
    <CToaster position='top-right'>
      {notifications.map((notify, index) => {
        return (
          <CToast
            key={`notify_${index}`}
            show
            autohide={notify.autohide || 15000}
            fade={notify.fade || true}
            color={notify.color || 'dark'}
          >
            <CToastHeader closeButton>
              {notify.title}
            </CToastHeader>
            <CToastBody dangerouslySetInnerHTML={{ __html: notify.body }} />
          </CToast>
        )
      })}
    </CToaster>
  )
}

export default Notifications
