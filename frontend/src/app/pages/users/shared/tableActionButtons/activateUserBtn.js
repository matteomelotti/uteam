import { CButton } from '@coreui/react'
import { useState } from 'react'

const ActivateUserBtn = (props) => {
  const { user: { active } } = props
  const [showActivateModal, setShowActivateModal] = useState(() => false)

  return (
    <td className='py-2'>
      <CButton
        color={active ? 'danger' : 'success'}
        variant='outline'
        shape='square'
        size='sm'
        className='mt-1 mb-1 tablesActionButton'
        onClick={() => setShowActivateModal((val) => !val)}
      >
        {active ? 'Disactivate' : 'Activate'}
      </CButton>

      {showActivateModal
        ? (<p>todo</p>)
        : ''}
    </td>
  )
}

export default ActivateUserBtn
