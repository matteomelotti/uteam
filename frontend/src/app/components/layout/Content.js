import React, { Suspense } from 'react'
import { Navigate, Route, Switch, useRouteMatch } from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// import routes from '../Routing/routes'
// import Page404 from '../views/pages/page404/Page404'
// import { user as _user } from '../state'
// import { useRecoilValue } from 'recoil'
// import { RouteI } from '../Routing/interface'

const loading = (
  <div className='pt-3 text-center'>
    <div className='sk-spinner sk-spinner-pulse' />
  </div>
)

const Content = ({ children }) => {
  // const { url } = useRouteMatch()
  // const user = useRecoilValue(_user)

  return (
    <main className='c-main'>
      <CContainer fluid>
        <Suspense fallback={loading}>
          {children}
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(Content)
