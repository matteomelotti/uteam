import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CFormSelect, CModalFooter, CFormInput, CRow, CCol, CSpinner, CContainer } from '@coreui/react'
// import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserUpdate } from 'api/mutations'
import { useRecoilState } from 'recoil'
import { notifications as _notifications } from '../../../../../state'
import { ALLOWED_ROLES } from '../../../../permissions/roles'

const EditUserModal = ({
  show, setShow, page,
  limit, user
}) => {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useRecoilState(_notifications)
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    role: yup.string().required()
  })

  const {
    handleSubmit, control, setError,
    formState: { errors, touchedFields }
  } = useForm({
    mode: 'all',
    shouldFocusError: true,
    resolver: yupResolver(schema)
  })

  const { isLoading: isMutating, mutate: updateUser } = useMutation(UserUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])

      setShow(false)
    },
    onError: ({ response: { data: { error, statusCode, message } } }) => {
      setError('email', {
        message
      })

      return setNotifications([...notifications, {
        title: `${error} ${statusCode}`,
        body: message,
        autohide: 5000,
        color: 'danger'
      }])
    }
  })

  const onSubmit = async (data) => {
    const dataKeys = Object.keys(data)
    let edit = false

    for (let i = 0; i < dataKeys.length; i++) {
      const fieldName = dataKeys[i]
      if (data[fieldName] !== user[fieldName]) {
        edit = true
      }
    }

    if (!edit) {
      return setNotifications([...notifications, {
        title: 'Update User',
        body: 'Nothing has changed',
        autohide: 5000,
        color: 'warning'
      }])
    }

    // const checkedEmail = await _checkEmail(data.email);

    // if ( !checkedEmail ) {
    //   return setError('email', {
    //     message: 'Email already exist.',
    //   })
    // }

    return updateUser({ id: user._id, ...data })
  }

  return (
    <>
      <CModal
        show={show}
        onClose={() => setShow(!show)}
        size='lg'
        color='primary'
        closeOnBackdrop={false}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader className='align-items-center'>
            <CModalTitle>
              Edit User
            </CModalTitle>

            <CButton className='close p-1 mr-1' aria-label='Close' onClick={() => setShow(false)}>
              <span aria-hidden='true'>&times;</span>
            </CButton>
          </CModalHeader>
          <CModalBody>
            <CRow>
              <CCol xs>
                <div>
                  <label htmlFor='firstName'>First Name*</label>
                  <Controller
                    name='firstName'
                    control={control}
                    defaultValue={user.firstName}
                    render={({ field: { ref, ...field } }) =>
                      <>
                        <CFormInput
                          {...field}
                          id='firstName'
                          valid={touchedFields.firstName && (errors.firstName == null)}
                          invalid={touchedFields.firstName && !!errors.firstName?.message}
                          name='firstName'
                        />
                        {/* <CInvalidFeedback>{errors.firstName?.message}</CInvalidFeedback> */}
                      </>}
                  />

                </div>
              </CCol>
              <CCol xs>
                <div>
                  <label htmlFor='lastName'>Last Name*</label>

                  <Controller
                    name='lastName'
                    control={control}
                    defaultValue={user.lastName}
                    render={({ field: { ref, ...field } }) =>
                      <CFormInput
                        {...field}
                        id='lastName'
                        valid={touchedFields.lastName && (errors.lastName == null)}
                        invalid={touchedFields.lastName && !!errors.lastName?.message}
                        name='lastName'
                      />}
                  />

                  <p className='invalid-feedback'>{errors.lastName?.message}</p>
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <div>
                  <label htmlFor='edit_email'>Email</label>

                  <Controller
                    name='email'
                    control={control}
                    defaultValue={user.email}
                    render={({ field: { ref, ...field } }) =>
                      <CFormInput
                        id='edit_email'
                        {...field}
                        valid={touchedFields.email && (errors.email == null)}
                        invalid={touchedFields.email && !!errors.email?.message}
                      />}
                  />

                  {/* <CInvalidFeedback>{errors.email?.message}</CInvalidFeedback> */}
                </div>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs>
                <div>
                  <label htmlFor='edit_role'>User Role</label>

                  <Controller
                    name='role'
                    control={control}
                    defaultValue={Object.entries(ALLOWED_ROLES).find(([key, val]) => val === user.role)[1]}
                    render={({ field: { ref, ...field } }) =>
                      <CFormSelect
                        {...field}
                        id='edit_role'
                        valid={touchedFields.role && (errors.role == null)}
                        invalid={touchedFields.role && !!errors.role?.message}
                      >
                        {Object.entries(ALLOWED_ROLES).map(([key, val]) => (
                          <option key={`mode_${key}`} value={val}>
                            {val}
                          </option>
                        ))}
                      </CFormSelect>}
                  />

                  {/* <CInvalidFeedback>{errors.role?.message}</CInvalidFeedback> */}
                </div>
              </CCol>
            </CRow>
          </CModalBody>
          <CModalFooter>
            <CContainer>
              <CButton
                color='primary'
                type='submit'
              >
                Edit
              </CButton>{' '}
              <CButton color='secondary' onClick={() => setShow(!show)}>
                Cancel
              </CButton>
            </CContainer>
          </CModalFooter>
        </form>
      </CModal>

      {isMutating
        ? (
          <div className='loading'>
            <CRow className='h-100 align-items-center justify-content-center'>
              <CSpinner color='primary' grow className='custom-spinner' />
            </CRow>
          </div>
          )
        : ''}
    </>
  )
}

export default EditUserModal
