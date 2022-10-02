import React, { useContext, useEffect, lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes, HashRouter, Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

import withCurrentUser from 'hoc/withCurrentUser'
import withSocket from 'hoc/withSocket'

import Storage from 'libs/storage'
import { JWT_TOKEN } from 'config'
import { useRecoilState, useRecoilValue } from 'recoil'
import { user as _user } from './state'
import { parseJwt } from './helpers/parseJwt'

import { privateRoutes } from './routes/routes'

const PrivateLayout = lazy(async () => await import('app/components/layout/PrivateLayout'))
const PublicLayout = lazy(async () => await import('app/components/layout/PublicLayout'))
const AuthLayout = lazy(async () => await import('app/components/layout/AuthLayout'))

const OnlyPublicRoute = lazy(async () => await import('routes/OnlyPublicRoute'))
const LoginPage = lazy(async () => await import('app/pages/auth/LoginPage'))
const ForgotPasswordPage = lazy(async () => await import('app/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(async () => await import('app/pages/auth/ResetPasswordPage'))
const ResendActivationPage = lazy(async () => await import('app/pages/auth/ResendActivationPage'))
const RegisterPage = lazy(async () => await import('app/pages/auth/RegisterPage'))
const ActivateAccountPage = lazy(async () => await import('app/pages/auth/ActivateAccountPage'))

const OnlyPublic = withCurrentUser(withSocket(OnlyPublicRoute))

const ApplicationRouter = () => {
  // const [user, setUser] = useRecoilState(_user)
  // const loadUser = async () => {
  //   const token = Storage.getItem(JWT_TOKEN)

  //   if (token) {
  //     const user = parseJwt(token)
  //     await setUser(user.user)
  //   } else {
  //     setUser(null)
  //   }
  // }

  // useEffect(() => {
  //   if (user == null) {
  //     loadUser()
  //   }
  // })

  return (
    <BrowserRouter>
      <Suspense fallback={<CSpinner color='primary' />}>
        <Routes>
          <Route exact path='/*' element={<PublicLayout />} />
          <Route exact path='auth/*' element={<AuthLayout />}>
            <Route exact name='Login' path='login' element={<OnlyPublic component={LoginPage} />} />
            <Route exact name='Login' path='forgot-password' element={<OnlyPublic component={ForgotPasswordPage} />} />
            <Route exact name='Login' path='resend-activation' element={<OnlyPublic component={ResendActivationPage} />} />
            <Route exact name='Login' path='reset-password/:email' element={<OnlyPublic component={ResetPasswordPage} />} />
            <Route exact name='Login' path='activate/:email' element={<OnlyPublic component={ActivateAccountPage} />} />
            <Route exact name='Login' path='register' element={<OnlyPublic component={RegisterPage} />} />
          </Route>
          <Route path='*' element={<PrivateLayout />}>
            {privateRoutes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={route.element}
                  />
                )
              )
            })}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default ApplicationRouter
