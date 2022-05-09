import React, { lazy } from 'react'
import withCurrentUser from 'hoc/withCurrentUser'

const PrivateRoute = lazy(async () => await import('routes/PrivateRoute'))
const OnlyPublicRoute = lazy(async () => await import('routes/OnlyPublicRoute'))
const DashboardPage = lazy(async () => await import('app/pages/dashboard/DashboardPage'))
const IndexPage = lazy(async () => await import('app/pages/public/IndexPage'))
const LoginPage = lazy(async () => await import('app/pages/auth/LoginPage'))
const ForgotPasswordPage = lazy(async () => await import('app/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(async () => await import('app/pages/auth/ResetPasswordPage'))
const ResendActivationPage = lazy(async () => await import('app/pages/auth/ResendActivationPage'))
const RegisterPage = lazy(async () => await import('app/pages/auth/RegisterPage'))
const ActivateAccountPage = lazy(async () => await import('app/pages/auth/ActivateAccountPage'))
const Chats = lazy(async () => await import('app/pages/chats'))
const Users = lazy(async () => await import('app/pages/users'))

const Private = withCurrentUser(PrivateRoute)
const OnlyPublic = withCurrentUser(OnlyPublicRoute)

const routes = [
  { path: '/', exact: true, name: 'Home', element: <IndexPage /> }
]

const authRoutes = [
  { path: 'login', exact: true, name: 'Login', element: <OnlyPublic><LoginPage /></OnlyPublic> },
  { path: 'forgot-password', exact: true, name: 'Login', element: <OnlyPublic><ForgotPasswordPage /></OnlyPublic> },
  { path: 'resend-activation', exact: true, name: 'Login', element: <OnlyPublic><ResendActivationPage /></OnlyPublic> },
  { path: 'reset-password/:email', exact: true, name: 'Login', element: <OnlyPublic><ResetPasswordPage /></OnlyPublic> },
  { path: 'activate/:email', exact: true, name: 'Login', element: <OnlyPublic><ActivateAccountPage /></OnlyPublic> },
  { path: 'register', exact: true, name: 'Login', element: <OnlyPublic><RegisterPage /></OnlyPublic> }
]

const privateRoutes = [
  { path: 'dashboard', exact: true, name: 'Dashboard', element: <Private allowedRoles={['admin', 'user']} component={DashboardPage} /> },
  { path: 'users', exact: true, name: 'Users', element: <Private allowedRoles={['admin', 'user']} component={Users} /> },
  { path: 'chats', exact: true, name: 'Chats', element: <Private allowedRoles={['admin', 'user']} component={Chats} /> },
  { path: 'user/edit', exact: true, name: 'User Edit', element: <Private allowedRoles={['admin', 'user']} component={Users} /> }
]

export {
  routes,
  authRoutes,
  privateRoutes
}
