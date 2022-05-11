import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import nav from '../nav'
import { useRecoilValue } from 'recoil'
import { user as _user } from '../../../../state'
import logoPng from '../../../../assets/icons/logo-blue.png'

const AppSidebar = () => {
  const user = useRecoilValue(_user)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigation = nav.filter((nav) => (
    (nav.allowRoles == null) || (nav.allowRoles?.includes(user?.role))
  )).map(({ allowRoles, ...nav }) => nav)

  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
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
