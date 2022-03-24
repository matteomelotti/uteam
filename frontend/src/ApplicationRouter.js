import React, { useEffect, lazy } from 'react'
import { Switch } from 'react-router-dom'
import PrivateRoute from 'routes/PrivateRoute'
import OnlyPublicRoute from 'routes/OnlyPublicRoute'
import withCurrentUser from 'hoc/withCurrentUser'
import PublicLayout from 'app/components/layout/PublicLayout'
import AuthLayout from 'app/components/layout/AuthLayout'
import LoginPage from 'app/pages/auth/LoginPage'
import ForgotPasswordPage from 'app/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from 'app/pages/auth/ResetPasswordPage'
import ResendActivationPage from 'app/pages/auth/ResendActivationPage'
import RegisterPage from 'app/pages/auth/RegisterPage'
import ActivateAccountPage from 'app/pages/auth/ActivateAccountPage'
import DashboardPage from 'app/pages/dashboard/DashboardPage'
import IndexPage from 'app/pages/public/IndexPage'
import EditUserPage from 'app/pages/users/EditUserPage'

import Storage from 'libs/storage'
import { JWT_TOKEN } from 'config'
import { useRecoilState } from 'recoil'
import { user as _user } from './state'
import { parseJwt } from './helpers/parseJwt'

// import PrivateLayout from 'app/components/layout/PrivateLayout'
const PrivateLayout = lazy(async () => await import('app/components/layout/PrivateLayout'))
const Users = lazy(async () => await import('app/pages/users'))

const Private = withCurrentUser(PrivateRoute)
const OnlyPublic = withCurrentUser(OnlyPublicRoute)

const ApplicationRouter = () => {
  const [user, setUser] = useRecoilState(_user)
  const loadUser = async () => {
    const token = Storage.getItem(JWT_TOKEN)

    if (token) {
      const user = parseJwt(token)
      await setUser(user.user)
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    if (user == null) {
      loadUser()
    }
  })

  return (
    <Switch>
      <OnlyPublic exact path='/' component={IndexPage} layout={PublicLayout} />
      <OnlyPublic exact path='/auth/login' component={LoginPage} layout={AuthLayout} />
      <OnlyPublic exact path='/auth/forgot-password' component={ForgotPasswordPage} layout={AuthLayout} />
      <OnlyPublic exact path='/auth/resend-activation' component={ResendActivationPage} layout={AuthLayout} />
      <OnlyPublic exact path='/auth/reset-password/:email' component={ResetPasswordPage} layout={AuthLayout} />
      <OnlyPublic exact path='/auth/activate/:email' component={ActivateAccountPage} layout={AuthLayout} />
      <OnlyPublic exact path='/auth/register' component={RegisterPage} layout={AuthLayout} />
      <Private exact path='/dashboard' layout={PrivateLayout} allowedRoles={['admin', 'user']} component={DashboardPage} />
      <Private exact path='/users' layout={PrivateLayout} allowedRoles={['admin', 'user']} component={Users} />
      <Private exact path='/user/edit' layout={PrivateLayout} allowedRoles={['admin', 'user']} component={EditUserPage} />
    </Switch>
  )
}

export default ApplicationRouter
