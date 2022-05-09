import React, {useRef } from 'react'
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

import CIcon from '@coreui/icons-react'
import TranslateMessage from '../../i18n/translateMessage'

import { useRecoilState, useRecoilValue } from 'recoil'
import io from 'socket.io-client'
import { useQueryClient } from 'react-query'

const Sidebar = () => {
  const { t } = useTranslation()
  const [show] = useRecoilState(_sidebarShow)
  const { unreadMessage } = useRecoilValue(_user)
  const socket = useRef()
  // const navigation = getNav('it').filter((nav) => (
  //   (nav.allowRoles == null) || (nav.allowRoles?.includes(user?.role))
  // )).map(({ allowRoles, ...nav }) => nav)

  return (
    <CSidebar
      position='fixed'
      unfoldable
      show={!!show}
    >
      <CSidebarBrand className='d-none d-md-flex' to='/'>
        <p className='h2'>
          {t('sideBar.title')}
        </p>
      </CSidebarBrand>
      <CSidebarNav>
        <CSidebarNavItem
          name={<TranslateMessage message='sideBar.menu.admin.home' />}
          to='/dashboard'
          icon={<CIcon name='cil-home' customClasses='c-sidebar-nav-icon' />}
        />
        <CSidebarNavItem
          name={<TranslateMessage message='sideBar.menu.user.chats' />}
          to='/chats'
          icon={<CIcon name='cil-home' customClasses='c-sidebar-nav-icon' />}
          badge={unreadMessage ? {
            color: 'danger',
            text: 'NEW'
          } : {}}
        />
        <CSidebarNavItem
          name={<TranslateMessage message='sideBar.menu.admin.users' />}
          to='/users'
          icon={<CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />}
        />
        {/* <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        /> */}
        <CSidebarNavDivider />
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(Sidebar)
