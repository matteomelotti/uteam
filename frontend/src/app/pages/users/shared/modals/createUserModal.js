import { CButton, CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CInvalidFeedback, CInput, CLabel, CFormGroup, CRow, CCol, CSpinner, CContainer, CForm } from '@coreui/react'
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
    password: yup.string().required()
  })

  const {
    handleSubmit, control, register,
    formState: { errors, touchedFields }
  } = useForm({
    mode: 'all',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const { isLoading: isMutating, mutate } = useMutation(UserCreate, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users', { page, limit }])
      setShow(false)

      setNotifications([...notifications, {
        title: 'New user successfully created',
        body: `Name: ${data.name}. Email: ${data.email}`,
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
        show={show}
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
                <CFormGroup>
                  <CLabel htmlFor='firstName'>First Name*</CLabel>
                  <Controller
                    name='firstName'
                    control={control}
                    defaultValue=''
                    render={({ field: { ref, value, name, ...field }, fieldState: { invalid, isTouched, isDirty, error }, formState: { errors } }) =>
                      <>
                        <input {...register("firstName")} />
                        <CInvalidFeedback>{errors.firstName?.message}</CInvalidFeedback>
                        {/* <CInput
                          {...register.firstName}
                          {...field}
                          id='firstName'
                          valid={touchedFields.firstName && (errors.firstName == null)}
                          invalid={touchedFields.firstName && !!errors.firstName?.message}
                          name='firstName'
                        /> */}
                        {/* <CInvalidFeedback>{error}</CInvalidFeedback> */}
                        {/* <p className='invalid-feedback'>{error?.message}</p> */}
                      </>}
                  />

                </CFormGroup>
              </CCol>
              <CCol xs>
                <CFormGroup>
                  <CLabel htmlFor='lastName'>Last Name*</CLabel>

                  <Controller
                    name='lastName'
                    control={control}
                    defaultValue=''
                    render={({ field: { ref, ...field } }) =>
                      <CInput
                        {...field}
                        id='lastName'
                        valid={touchedFields.lastName && (errors.lastName == null)}
                        invalid={touchedFields.lastName && !!errors.lastName?.message}
                        name='lastName'
                      />}
                  />

                  <p className='invalid-feedback'>{errors.lastName?.message}</p>
                </CFormGroup>
              </CCol>
            </CRow>

            <CFormGroup>
              <CLabel htmlFor='email'>Email*</CLabel>

              <Controller
                name='email'
                control={control}
                defaultValue=''
                render={({ field: { ref, ...field } }) =>
                  <CInput
                    id='email'
                    name='email'
                    {...field}
                    valid={touchedFields.email && (errors.email == null)}
                    invalid={touchedFields.email && !!errors.email?.message}
                  />}
              />

              <CInvalidFeedback>{errors.email?.message}</CInvalidFeedback>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor='password'>Password*</CLabel>

              <Controller
                name='password'
                control={control}
                defaultValue=''
                render={({ field: { ref, ...field } }) =>
                  <CInput
                    id='password'
                    name='password'
                    type='password'
                    {...field}
                    valid={touchedFields.password && (errors.password == null)}
                    invalid={touchedFields.password && !!errors.password?.message}
                  />}
              />

              <CInvalidFeedback>{errors.password?.message}</CInvalidFeedback>
            </CFormGroup>
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
        ? (<div className='loading'>
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
