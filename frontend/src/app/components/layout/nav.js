import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilEnvelopeOpen,
  cilPeople
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

import { ALLOWED_ROLES } from '../../permissions/roles'
import TranslateMessage from '../../i18n/translateMessage'

const menu = [
  {
    component: CNavItem,
    name: <TranslateMessage message='sideBar.menu.admin.home' />,
    to: '/dashboard',
    icon: <CIcon icon={cilHome} customClassName='nav-icon' />
  },
  {
    component: CNavItem,
    name: <TranslateMessage message='sideBar.menu.user.chats' />,
    to: '/chats',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName='nav-icon' />
  }
]

const forAdmin = [
  {
    component: CNavItem,
    name: <TranslateMessage message='sideBar.menu.admin.users' />,
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName='nav-icon' />
  }
].map((item) => ({ ...item, allowRoles: [ALLOWED_ROLES.ADMIN] }))

const forUser = [].map((item) => ({ ...item, allowRoles: [ALLOWED_ROLES.USER] }))

const _nav = [...menu, ...forAdmin, ...forUser]

export default _nav
