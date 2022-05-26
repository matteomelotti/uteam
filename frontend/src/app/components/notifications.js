import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react'
import { useRecoilValue } from 'recoil'
import {
  notifications as _notifications
} from '../../state'

const Notifications = () => {
  const notifications = useRecoilValue(_notifications)

  return (
    <CToaster className='position-fixed top-0 end-0'>
      {notifications.map((notify, index) => {
        return (
          <CToast
            key={index}
            autohide
            visible
            delay={notify.autohide || 15000}
            color={notify.color || 'dark'}
          >
            <CToastHeader closeButton>
              <svg
                className='rounded me-2'
                width='20'
                height='20'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='xMidYMid slice'
                focusable='false'
                role='img'
              >
                <rect width='100%' height='100%' fill='#007aff' />
              </svg>
              <strong className='me-auto'>{notify.title}</strong>
              {/* <small>7 min ago</small> */}
            </CToastHeader>
            <CToastBody dangerouslySetInnerHTML={{ __html: notify.body }} />
          </CToast>
        )
      })}
    </CToaster>
  )
}

export default Notifications
