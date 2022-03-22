import CIcon from '@coreui/icons-react'
import { ALLOWED_ROLES } from '../../permissions/roles'
import TranslateMessage from '../../i18n/translateMessage'

const menu = []

const forAdmin = [
  {
    _tag: 'CSidebarNavTitle',
    _children: [{ id: 'sideBar.menu.admin.title' }]
  },
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
