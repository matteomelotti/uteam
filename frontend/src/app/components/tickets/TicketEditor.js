import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import Loader from 'app/components/Loader'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TicketCreate, TicketEdit } from 'api/mutations'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Form, FormGroup, Col } from 'react-bootstrap'
import ConfirmAlert from 'libs/confirmAlert'
import './TicketForm.scss'

// TODO: deve diventare ache un editor che accetta l'update
const TicketEditor = ({ ticket, ticketState, setTicketState }) => {
  const queryClient = useQueryClient()
  const [ticketEditorOpen, setOpenTicketEditor] = useState(false)
  const { t } = useTranslation()
  const schema = yup.object().shape({
    title: yup.string().required()
  })

  useEffect(() => {
    if (ticket && ticketState === 'edit') {
      setOpenTicketEditor(true)
    }
  }, [])

  const { register, handleSubmit, reset, formState: { resetField, isSubmitting, errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: ticket?.title || ''
    }
  })
  const createMutation = useMutation(TicketCreate)
  const editMutation = useMutation(TicketEdit)

  const onSubmit = async data => {
    try {
      if (ticket && ticketState === 'edit') {
        await editMutation.mutateAsync({ ...data, id: ticket._id })
      } else {
        await createMutation.mutateAsync(data)
      }
      queryClient.invalidateQueries(['TicketsList'])
      reset()
      if (ticket && ticketState === 'edit') {
        setTicketState(null)
      }
    } catch (error) {
      // console.log('error', error)
      ConfirmAlert.error('ticket non creato')
    }
    setOpenTicketEditor(false)
  }

  const handleCloseEditor = () => {
    if (ticket && ticketState === 'edit') {
      setTicketState(null)
    }
    setOpenTicketEditor(false)
  }

  const EditorForm = () => {
    if (ticketEditorOpen) {
      return (
        <Form id='new-ticket-form' name='new-ticket-form' data-name='New Ticket Form' className='todo-form' onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-3' controlId='formBasicEmail'> {/* todo-add */}
            {/* <Form.Label>Ticket title</Form.Label> */}
            <Form.Control type='text' placeholder='Ticket title' name='title' aria-describedby='titleHelp' maxLength='256' data-name='Title' id='ticket-title' {...register('title', { required: true })} />
            <Form.Text className='form-text error'>{errors.title?.message}</Form.Text>
          </Form.Group>

          <Button
            type='submit'
            className='btn green w-200 mr-1'
            data-wait='Please wait...'
          >
            {t('ticketsContainer.saveTicket')}
          </Button>
          <Button
            type='button'
            className='btn red w-200'
            data-wait='Please wait...'
            onClick={() => handleCloseEditor()}
          >
            {t('ticketsContainer.cancel')}
          </Button>
        </Form>
      )
    }

    return (
      <Button
        type='button'
        className='btn green w-200'
        data-wait='Please wait...'
        onClick={() => setOpenTicketEditor(true)}
      >
        {t('ticketsContainer.addTicket')}
      </Button>
    )
  }

  return (
    <>
      <EditorForm />
    </>
  )
}
export default TicketEditor
