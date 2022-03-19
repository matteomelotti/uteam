import React, {useState} from 'react'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'

// import { getNav } from './_nav'
import {
  // user as _user,
  sidebarShow as _sidebarShow
} from '../../../state'

import { useRecoilState, useRecoilValue } from 'recoil'
// import { useIntl } from 'react-intl'
// import translate from '../i18n/translate'

// const tPath = `containers.theSidebar`;

const Sidebar = () => {
  const [show, setShow] = useRecoilState(_sidebarShow)
  // const user = useRecoilValue(_user)
  // const intl = useIntl();

  // const navigation = getNav('it').filter((nav) => (
  //   (nav.allowRoles == null) || (nav.allowRoles?.includes('admin'))
  // )).map(({ allowRoles, ...nav }) => nav)

  return (
    <CSidebar
      show={!!show}
      unfoldable
      onShowChange={(val) => setShow(val)}
    >
      <CSidebarBrand className='d-md-down-none' to='/'>
        <p className='h2'>
          UTeam
          {/* { translate(`${tPath}.title`) } */}
        </p>
      </CSidebarBrand>
      <CSidebarNav>
        {/* <CCreateElement
          items={[]}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
        <CSidebarNavDivider />
      </CSidebarNav>
      {/* <CSidebarMinimizer className='c-d-md-down-none' /> */}
    </CSidebar>
  )
}

export default React.memo(Sidebar)
