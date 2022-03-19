import React from 'react'
import { CFooter } from '@coreui/react'
// import translate from '../i18n/translate'

const tPath = `containers.theFooter`;

const Footer = () => {
  return (
    <CFooter fixed={false}>
      <div className='mfs-auto'>
        <span className='mr-1'>
          {/* { translate(`${tPath}.poweredBy`) } */}
        </span>
      </div>
    </CFooter>
  )
}

export default React.memo(Footer)
