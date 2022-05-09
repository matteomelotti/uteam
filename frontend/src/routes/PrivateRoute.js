import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({
  user, isAuthenticated, component: Component, allowedRoles, ...rest
}) => {
  const allowed = isAuthenticated && user // && allowedRoles.includes(user.role)

  return isAuthenticated
    ? (
        allowed
          ? (<Component user={user} {...rest} />)
          : <Component user={user} {...rest} />)
    : <Navigate to='/auth/login' />
}

export default PrivateRoute
