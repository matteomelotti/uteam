import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler
} from '@coreui/react'

import { useRecoilState } from 'recoil'
import logoPng from '../../../../assets/icons/logo-blue.png'
import { sidebarShow as _sidebarShow } from '../../../../state'
import { AppHeaderDropdown } from './header/index'
import { AppBreadcrumb } from './index'

const AppHeader = () => {
  const [sidebarShow, setSidebarShow] = useRecoilState(_sidebarShow)

  return (
    <CHeader position='sticky' className='mb-4'>
      <CContainer fluid>
        <CHeaderToggler
          className='ps-1'
          onClick={() => setSidebarShow(!sidebarShow) }
        >
          <CIcon icon={cilMenu} size='lg' />
        </CHeaderToggler>
        <CHeaderBrand className='mx-auto d-md-none' to='/'>
          <img src={logoPng} type='image/png' style={{ width: '160px', padding: '10px' }} />
        </CHeaderBrand>
        <CHeaderNav className='d-none d-md-flex me-auto' />
        <CHeaderNav>
          {/* <CNavItem>
            <CNavLink href='#'>
              <CIcon icon={cilBell} size='lg' />
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href='#'>
              <CIcon icon={cilList} size='lg' />
            </CNavLink>
          </CNavItem> */}
          {/* <CNavItem>
            <CNavLink href='#'>
              <CIcon icon={cilEnvelopeOpen} size='lg' />
            </CNavLink>
          </CNavItem> */}
        </CHeaderNav>
        <CHeaderNav className='ms-3'>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
