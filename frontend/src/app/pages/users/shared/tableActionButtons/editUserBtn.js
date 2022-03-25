import { CButton } from '@coreui/react'
import { useState } from 'react'

const EditUserBtn = (props) => {
  const [showEditUserModal, setShowEditUserModal] = useState(() => false)

  return (
    <td className='py-2'>
      <CButton
        color='info'
        variant='outline'
        shape='square'
        size='sm'
        className='mt-1 mb-1 tablesActionButton'
        onClick={() => setShowEditUserModal((val) => !val)}
      >
        Edit User
      </CButton>

      {showEditUserModal
        ? (<><p>todo</p></>)
        : ''}
    </td>
  )
}

export default EditUserBtn
