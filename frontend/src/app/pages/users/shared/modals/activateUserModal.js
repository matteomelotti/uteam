import { CButton, CModal, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { useMutation, useQueryClient } from 'react-query'
import { ActivateUser } from 'api/mutations'

const ActivateUserModal = ({
  show, setShow, page, limit, ...props
}) => {
  const { user: { active, _id: id } } = props
  const queryClient = useQueryClient()

  const { mutate } = useMutation(ActivateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])

      setShow(false)
    }
  })

  return (
    <CModal
      show={show}
      onClose={() => setShow(!show)}
      size='sm'
      color={active ? 'danger' : 'success'}
      closeOnBackdrop={false}
    >
      <CModalHeader className='align-items-center'>
        <CModalTitle>
          Are you sure you want to {active ? 'Disactivate' : 'Activate'}?
        </CModalTitle>

        <CButton className='close p-1 mr-1' aria-label='Close' onClick={() => setShow(false)}>
          <span aria-hidden='true'>&times;</span>
        </CButton>
      </CModalHeader>
      <CModalFooter className='justify-content-around'>
        <CButton color={active ? 'danger' : 'success'} onClick={() => mutate(id)}>
          {active ? 'Disactivate' : 'Activate'}
        </CButton>{' '}
        <CButton color='secondary' onClick={() => setShow(!show)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ActivateUserModal
