import { useRecoilState, useRecoilValue } from 'recoil'
import React from 'react'
import {
  user as _user,
  darkMode as _darkMode,
  sidebarShow as _sidebarShow
} from '../../../state'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import HeaderDropdown from './HeaderDropdown'

const Header = () => {
  const user = useRecoilValue(_user)
  const [darkMode, setDarkMode] = useRecoilState(_darkMode)
  const [sidebarShow, setSidebarShow] = useRecoilState(_sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    setSidebarShow(val)
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    setSidebarShow(val)
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className='ml-md-3 d-lg-none'
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className='ml-3 d-md-down-none'
        onClick={toggleSidebar}
      />
      <CHeaderBrand className='mx-auto d-lg-none' to='/'>
        <CIcon name='logo' height='48' alt='Logo' />
      </CHeaderBrand>

      <CHeaderNav className='d-md-down-none mr-auto' />

      <CHeaderNav className='px-3'>
        <h3 className='m-0 mr-2'>
          <CBadge color='primary'>
            {user?.email}
          </CBadge>
        </h3>

        <CToggler
          inHeader
          className='ml-3 d-md-down-none c-d-legacy-none'
          onClick={() => setDarkMode(!darkMode)}
          title='Toggle Light/Dark Mode'
        >
          <CIcon name='cil-moon' className='c-d-dark-none' alt='CoreUI Icons Moon' />
          <CIcon name='cil-sun' className='c-d-default-none' alt='CoreUI Icons Sun' />
        </CToggler>

        <HeaderDropdown />
      </CHeaderNav>
    </CHeader>
  )
}

export default Header
