import React, { } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ChangePassword } from 'api/mutations'
import { useMutation } from 'react-query'
import ConfirmAlert from 'libs/confirmAlert'
import { useTranslation } from 'react-i18next'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Box from 'app/components/dashboard/Box'

const schema = yup.object().shape({
  password: yup.string().min(8).required('editUserPage.passwordRequired')
})

const EditUserPage = (props) => {
  const user = props.user
  const { t } = useTranslation()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const mutation = useMutation(ChangePassword)

  const onSubmit = async data => {
    data = { password: data.password }
    const response = await mutation.mutateAsync(data)
    if (response) {
      ConfirmAlert.success(t('editUserPage.passwordUpdated'))
      props.history.push('/')
    }
  }

  return (
    <Row>
      <Col xs={6}>
        <Box
          header={
            <div>
              <h1>{t('editUserPage.changePassword')}</h1>
              <p>{t('editUserPage.insertNewPassword')}</p>
            </div>
          }
          body={
            <div>
              <Form id='email-form' name='email-form' data-name='Reset Password Form' onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type='password' maxLength='256' name='password' data-name='password' placeholder='' id='password' {...register('password', { required: true })} />
                  <span className='text-muted'>
                    {errors.password?.message}
                  </span>
                </Form.Group>
                <Button type='submit' className='custom-btn green w-100-perc' data-wait='Please wait...'>{t('editUserPage.updatePassword')}</Button>
              </Form>
            </div>
          }
        />
      </Col>
      <Col xs={6}>
        <Box
          header={
            <div>
              <h1>{t('editUserPage.userData')}</h1>
              <p>{t('editUserPage.userData')}</p>
            </div>
          }
          body={
            <div>
              <p>Email: {user?.email}</p>
              <p>Role: {user?.role}</p>
            </div>
          }
        />
      </Col>
    </Row>
  )
}
export default EditUserPage
