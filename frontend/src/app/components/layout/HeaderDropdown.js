import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import {
//   isAuthorized as _isAuthorized,
//   user as _user
// } from '../state'
import { useQueryClient } from 'react-query'
// import translate from '../i18n/translate';
import { Logout } from 'api/mutations'

// const tPath = `containers.theHeaderDropdown`;

const TheHeaderDropdown = () => {
  const queryClient = useQueryClient()

  const logOut = () => {
    // localStorage.removeItem('token')
    queryClient.removeQueries()
    Logout()
    window.location.href = '/auth/login'
    // const redirectTo = `${process.env.REACT_APP_API_PATH}/auth/logout`
  }

  return (
    <CDropdown
      inNav
      className='c-header-nav-items'
      // direction="down"
    >
      <CDropdownToggle className='c-header-nav-link' caret={false}>
        <CIcon name='cil-user' />
      </CDropdownToggle>
      <CDropdownMenu className='p-0' placement='bottom-end'>
        <CDropdownItem onClick={logOut}>
          <CIcon name='cil-lock-locked' />
          {/* { translate(`${tPath}.logOut`) } */}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
