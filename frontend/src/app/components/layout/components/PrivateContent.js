import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import { privateRoutes } from '../../../../routes/routes'

const PrivateContent = () => {
  return (
    <CContainer fluid>
      <Suspense fallback={<CSpinner color='primary' />}>
        <Routes>
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
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(PrivateContent)
