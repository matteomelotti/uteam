import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import nav from '../nav'
import { useRecoilValue, useRecoilState } from 'recoil'
import { user as _user, sidebarShow as _sidebarShow } from '../../../../state'
import logoPng from '../../../../assets/icons/logo-blue.png'
import CIcon from '@coreui/icons-react'
import { cilHome, cilEnvelopeOpen, cilPeople } from '@coreui/icons'
import { CNavItem } from '@coreui/react'
import { ALLOWED_ROLES } from '../../../permissions/roles'
import TranslateMessage from '../../../i18n/translateMessage'
import { unreadMessages as _unreadMessages } from '../../../../state'
import { useLocation, matchRoutes } from 'react-router-dom'

const AppSidebar = () => {
  const user = useRecoilValue(_user)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sidebarShow, setSidebarShow] = useRecoilState(_sidebarShow)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const [unreadMessages,] = useRecoilState(_unreadMessages)
  const [chatBadge, setChatBadge] = useState({})
  const location = useLocation()
  const routes = [{ path: "/chats" }]

  useEffect(() => {
    if (unreadMessages && !matchRoutes(routes, location)) {
      setChatBadge({
        color: 'success',
        text: 'NEW',
      })
      setSidebarShow(true)
    } else {
      setChatBadge({})
    }
  }, [unreadMessages])

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
      icon: <CIcon icon={cilEnvelopeOpen} customClassName='nav-icon' />,
      badge: chatBadge
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
  const navigation = _nav.filter((nav) => (
    (nav.allowRoles == null) || (nav.allowRoles?.includes(user?.role))
  )).map(({ allowRoles, ...nav }) => nav)

  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        setSidebarShow(visible)
      }}
    >
      <CSidebarBrand className='d-none d-md-flex' to='/'>
        <img src={logoPng} type='image/png' style={{ width: '160px', padding: '10px' }} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className='d-none d-lg-flex'
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
