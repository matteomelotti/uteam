import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// TODO: Refactor: do not nest ternary operator
const PrivateRoute = ({
  user, isAuthenticated, component: Component, layout: Layout, container, allowedRoles, ...rest
}) => {
  const allowed = isAuthenticated && user && allowedRoles.includes(user.role)

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          /* eslint multiline-ternary: ["error", "never"] */
          !isAuthenticated ? (
            <Redirect to={{
              pathname: '/auth/login',
              state: { from: props.location }
            }}
            />
          ) : (
            allowed ? (
              Layout === undefined ? (
                <Component user={user} {...props} />
              ) : (
                <Layout container={container} user={user}><Component user={user} {...props} /></Layout>
              )
            ) : (
              <div>Forbidden</div>
            )
          )
        )
      }}
    />
  )
}

export default PrivateRoute
