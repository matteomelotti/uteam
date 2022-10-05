import {
  cilLockLocked
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAvatar, CDropdown, CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react'
import { Logout } from 'api/mutations'
import { useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import avatar8 from '../../../../../assets/images/avatars/8.jpg'
import { user as _user } from '../../../../../state'

const AppHeaderDropdown = () => {
  const [user, setUser] = useRecoilState(_user)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logOut = () => {
    queryClient.removeQueries()
    Logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <CDropdown variant='nav-item'>
      <CDropdownToggle placement='bottom-end' className='py-0' caret={false}>
        <CAvatar src={avatar8} size='md' />
      </CDropdownToggle>
      <CDropdownMenu className='pt-0' placement='bottom-end'>
        <CDropdownHeader className='bg-light fw-semibold py-2'>Account</CDropdownHeader>
        <CDropdownItem onClick={logOut}>
          <CIcon icon={cilLockLocked} className='me-2' />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
