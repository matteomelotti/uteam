import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CFormSelect, CModalFooter, CFormInput, CRow, CCol, CSpinner, CContainer, CForm } from '@coreui/react'
// import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserCreate } from 'api/mutations'
import { useRecoilState } from 'recoil'
import { notifications as _notifications } from '../../../../../state'

const CreateUserModal = ({ show, setShow, page = 1, limit = 5, setPage }) => {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useRecoilState(_notifications)
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    role: yup.string().required()
  })

  const {
    handleSubmit, control,
    formState: { errors, touchedFields }
  } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    resolver: yupResolver(schema)
  })

  const { isLoading: isMutating, mutate } = useMutation(UserCreate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users'])
      setShow(false)

      setNotifications([...notifications, {
        title: 'New user successfully created',
        body: `Name: ${data.data.firstName}. Email: ${data.data.email}`,
        autohide: 5000,
        color: 'success'
      }])
    },
    onError: (error) => {
      // need caught right error;
      setNotifications([
        ...notifications,
        {
          title: error.name,
          body: error.message,
          autohide: 5000,
          color: 'danger'
        }
      ])
    }
  })

  const onSubmit = (data) => {
    const postData = { ...data }

    mutate(postData)
  }

  return (
    <>
      <CModal
        visible={show}
        onClose={() => setShow(!show)}
        closeOnBackdrop={false}
        size='lg'
        color='primary'
      >
        <CForm onSubmit={handleSubmit(onSubmit)}>
          <CModalHeader className='align-items-center'>
            <CModalTitle>Create User</CModalTitle>

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
                    defaultValue=''
                    render={({ field: { ref, value, name, ...field }, fieldState: { invalid, isTouched, isDirty, error }, formState: { errors } }) =>
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
                    defaultValue=''
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

            <div>
              <label htmlFor='email'>Email*</label>

              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field: { ref, ...field } }) =>
                  <CFormInput
                    id='email'
                    name='email'
                    {...field}
                    valid={touchedFields.email && (errors.email == null)}
                    invalid={touchedFields.email && !!errors.email?.message}
                  />}
              />

              {/* <CInvalidFeedback>{errors.email?.message}</CInvalidFeedback> */}
            </div>
            <div>
              <label htmlFor='password'>Password*</label>

              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field: { ref, ...field } }) =>
                  <CFormInput
                    id='password'
                    name='password'
                    type='password'
                    {...field}
                    valid={touchedFields.password && (errors.password == null)}
                    invalid={touchedFields.password && !!errors.password?.message}
                  />}
              />

              {/* <CInvalidFeedback>{errors.password?.message}</CInvalidFeedback> */}
            </div>

            <div>
              <label htmlFor='role'>Role*</label>

              <Controller
                name='role'
                control={control}
                defaultValue=''
                render={({ field: { ref, ...field } }) =>
                  <CFormSelect
                    id='role'
                    name='role'
                    {...field}
                    valid={touchedFields.role && (errors.role == null)}
                    invalid={touchedFields.role && !!errors.role?.message}
                  >
                    <option value=''>Select role</option>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                  </CFormSelect>}
              />

              {/* <CInvalidFeedback>{errors.role?.message}</CInvalidFeedback> */}
            </div>
          </CModalBody>

          <CModalFooter>
            <CContainer>
              <CButton color='primary' type='submit'>
                Create
              </CButton>{' '}
              <CButton color='secondary' type='button' onClick={() => setShow(!show)}>
                Cancel
              </CButton>
            </CContainer>
          </CModalFooter>
        </CForm>
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

export default CreateUserModal
