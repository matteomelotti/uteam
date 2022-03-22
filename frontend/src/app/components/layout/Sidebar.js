import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem
} from '@coreui/react'

import { getNav } from './nav'
import {
  user as _user,
  sidebarShow as _sidebarShow
} from '../../../state'

import { useRecoilState, useRecoilValue } from 'recoil'

const Sidebar = () => {
  const { t } = useTranslation()
  const [show, setShow] = useRecoilState(_sidebarShow)
  const user = useRecoilValue(_user)
  const navigation = getNav('it').filter((nav) => (
    (nav.allowRoles == null) || (nav.allowRoles?.includes(user?.role))
  )).map(({ allowRoles, ...nav }) => nav)

  return (
    <CSidebar
      show={!!show}
      unfoldable
      onShowChange={(val) => setShow(val)}
    >
      <CSidebarBrand className='d-md-down-none' to='/'>
        <p className='h2'>
          {t('sideBar.title')}
        </p>
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
        <CSidebarNavDivider />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(Sidebar)
