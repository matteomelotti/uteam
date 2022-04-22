import CIcon from '@coreui/icons-react'
import { ALLOWED_ROLES } from '../../permissions/roles'
import TranslateMessage from '../../i18n/translateMessage'
// import { user } from '../../../state'

const menu = [
  {
    _tag: 'CSidebarNavItem',
    name: <TranslateMessage message='sideBar.menu.admin.home' />,
    to: '/dashboard',
    icon: <CIcon name='cil-home' customClasses='c-sidebar-nav-icon' />
  },
  {
    _tag: 'CSidebarNavItem',
    name: <TranslateMessage message='sideBar.menu.user.chats' />,
    to: '/chats',
    icon: <CIcon name='cil-home' customClasses='c-sidebar-nav-icon' />
    // badge: {
    //   color: 'danger',
    //   text: 'NEW'
    // }
  }
]

const forAdmin = [
  {
    _tag: 'CSidebarNavItem',
    name: <TranslateMessage message='sideBar.menu.admin.users' />,
    to: '/users',
    icon: <CIcon name='cil-people' customClasses='c-sidebar-nav-icon' />
  }
].map((item) => ({ ...item, allowRoles: [ALLOWED_ROLES.ADMIN] }))

const forUser = [].map((item) => ({ ...item, allowRoles: [ALLOWED_ROLES.USER] }))

export const getNav = (intl) => {
  const _nav = [...menu, ...forAdmin, ...forUser]
  return _nav.map((item) => item._tag === 'CSidebarNavTitle' ? ({
    ...item, _children: item._children.map((id) => (
      typeof id === 'object' ? (
        id.id
      ) : `${id}`
    ))
  }) : item)
}
