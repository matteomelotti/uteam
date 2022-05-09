import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { authRoutes } from '../../../../routes/routes'

const AuthContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color='primary' />}>
        <Routes>
          {authRoutes.map((route, idx) => {
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
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AuthContent)
