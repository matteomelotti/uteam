import React from 'react'
import { Navigate } from 'react-router-dom'

const OnlyPublicRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? <Navigate to={{ pathname: '/dashboard' }} /> : children
}

export default OnlyPublicRoute
