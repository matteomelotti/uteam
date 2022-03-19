import { faTrash, faCircleNotch, faEdit, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQueryClient } from 'react-query'
import { TicketComplete } from 'api/mutations'
import { useRecoilState } from 'recoil'
import {
  notifications as _notifications
} from '../../../state'

const CompleteTicket = ({ ticketId }) => {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useRecoilState(_notifications)
  const {data, error, isError, isIdle, isLoading, isPaused, isSuccess, mutate, mutateAsync, reset, status} = useMutation(TicketComplete, {
    onSuccess: () => {
      queryClient.invalidateQueries(['TicketsList'])
      setNotifications([...notifications, {
        title: 'Successfully completed',
        body: 'The ticket was completed successfully',
        // autohide: 5000,
        color: 'success'
      }])
    }
  })

  if (isLoading) {
    return (
      <button className='do-ticket'>
        <FontAwesomeIcon spin icon={faSpinner} />
      </button>
    )
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <button className='do-ticket' onClick={() => mutateAsync(ticketId)}>
      <FontAwesomeIcon icon={faCheck} />
    </button>
  )
}

export default CompleteTicket
