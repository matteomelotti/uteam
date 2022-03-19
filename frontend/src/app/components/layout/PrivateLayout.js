import BaseFooter from 'app/components/layout/BaseFooter'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'
import React, { } from 'react'
import { darkMode as _darkMode } from '../../../state'
import { Link } from 'react-router-dom'
import { Logout, UpdateMe } from 'api/mutations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Container, Form } from 'react-bootstrap'
import '../../../css/privateLayout/private.css'
import classNames from 'classnames'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

const PrivateLayout = ({ children, user }) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const darkMode = useRecoilValue(_darkMode)
  const classes = classNames(
    'c-app c-default-layout',
    darkMode && 'c-dark-theme'
  )

  const logout = () => {
    Logout()
    window.location.href = '/auth/login'
  }

  const { register, handleSubmit } = useForm({ defaultValues: { language: user.language } })
  const mutation = useMutation(UpdateMe, {
    onSuccess: () => {
      queryClient.invalidateQueries(['Me'])
    }
  })

  const onSubmit = async data => {
    data = { language: data.language }
    await mutation.mutateAsync(data)
  }

  return (
    <div>
      <div className={classes}>
        <Sidebar />
        <div className='c-wrapper'>
          <Header />
          <div className='c-body'>
            <Content>
              {children}
            </Content>
          </div>
          <Footer />
        </div>
      </div>
      {/* <header>
        <div className='container-fluid'>
          <div className='row d-lg-flex justify-content-lg-center navbar-dark bg-dark'>
            <div className='col-md-12 col-lg-12 col-xl-8'>
              <nav className='navbar navbar-expand-md sticky-top d-xl-flex'>
                <div className='container-fluid'>
                  <Link className='navbar-brand' to='/'>
                    UTeam
                    <img className='logo' alt='' src='/images/...' />
                  </Link>
                  <button data-toggle='collapse' className='navbar-toggler' data-target='#navcol-1'><span className='sr-only'>{t('privateLayout.toggle')}</span><span className='navbar-toggler-icon' /></button>
                  <div className='collapse navbar-collapse d-md-flex d-lg-flex justify-content-md-start justify-content-lg-end' id='navcol-1'>
                    <ul className='navbar-nav d-md-flex flex-grow-1 justify-content-md-end flex-lg-grow-0 justify-content-xl-end'>
                      <li className='nav-item'>
                        <Form onChange={handleSubmit(onSubmit)}>
                          <select className='form-control form-control-sm select-locale' {...register('language')}>
                            <option value='it'>IT</option>
                            <option value='en'>EN</option>
                          </select>
                        </Form>
                      </li>
                      <li className='nav-item'><Link to='/user/edit' className='menu-link' id='user-edit' title={t('privateLayout.editUser')}><FontAwesomeIcon icon={faUser} /><span className='only-mobile'>{t('privateLayout.editUser')}</span></Link></li>
                      <li className='nav-item'><a href='#' onClick={logout} className='menu-link' id='logout' title={t('privateLayout.logout')}><FontAwesomeIcon icon={faSignOutAlt} /><span className='only-mobile'>{t('privateLayout.logout')}</span></a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <Container className='first-container'>
        {children}
      </Container>
      <BaseFooter /> */}
    </div>
  )
}

export default PrivateLayout
