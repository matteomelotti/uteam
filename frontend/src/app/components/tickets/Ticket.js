import React, { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import Loader from 'app/components/Loader'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Ticket.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCircleNotch, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { TicketDelete, TicketComplete } from 'api/mutations'
import { useMutation, useQueryClient } from 'react-query'
// import ConfirmAlert from 'libs/confirmAlert'
import DeleteConfirmation from '../common/DeleteConfirmation'
import { useRecoilState } from 'recoil'
import {
  notifications as _notifications
} from '../../../state'
import TicketEditor from './TicketEditor'
import CompleteTicket from './CompleteTicket'

const Ticket = ({ ticket }) => {
  const { title, _id: ticketId } = ticket
  // const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [type, setType] = useState(null)
  const [id, setId] = useState(null)
  const [notifications, setNotifications] = useRecoilState(_notifications)
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false)
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [ticketState, setTicketState] = useState(null)

  const { handleSubmit, formState: { isSubmitting } } = useForm()
  const mutation = useMutation(TicketDelete)

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (type, id) => {
    setType(type)
    setId(id)

    if (type === 'ticket') {
      setDeleteMessage('Are you sure you want to delete the ticket?')
    }

    setDisplayConfirmationModal(true)
  }

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false)
  }

  const onSubmit = async id => {
    try {
      await mutation.mutateAsync(id)
      queryClient.invalidateQueries(['TicketsList'])
      setNotifications([...notifications, {
        title: 'Successfully deleted',
        body: 'The ticket was deleted successfully',
        autohide: 5000,
        color: 'success'
      }])
      setDisplayConfirmationModal(false)
    } catch (error) {
      setNotifications([...notifications, {
        title: 'Error',
        body: 'ticket non eliminato',
        autohide: 5000,
        color: 'danger'
      }])
      // ConfirmAlert.error('')
      setDisplayConfirmationModal(false)
    }
  }

  return (
    <>
      {ticketState === 'edit'
        ? <TicketEditor
            ticket={ticket}
            ticketState={ticketState}
            setTicketState={setTicketState}
          />
        : (
          <div className='todo'>
            <CompleteTicket ticketId={ticketId} />
            <span>Title: {title}</span>
            <span>Id: {ticketId}</span>
            <Link to='#' className='mr-1' onClick={() => setTicketState('edit')}>
              <FontAwesomeIcon icon={faEdit} />
            </Link>
            <Form>
              <Link to='#' onClick={() => showDeleteModal('ticket', ticketId)}>
                {isSubmitting ? <FontAwesomeIcon spin icon={faCircleNotch} /> : <FontAwesomeIcon icon={faTrash} />}
              </Link>
            </Form>
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={handleSubmit(() => onSubmit(ticketId))} hideModal={hideConfirmationModal} type={type} id={id} message={deleteMessage} />
          </div>
          )}
    </>
  )
}
export default Ticket
