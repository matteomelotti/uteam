import React from 'react'
import { CCard, CCol, CRow } from '@coreui/react'

function Banner ({ bannerData }) {
  const { firstName, lastName } = bannerData

  return (
    <CCard color='teal' attached='top'>
      <CRow>
        <CCol floated='left' width={14}>
          <h4>
            {firstName} {lastName}
          </h4>
        </CCol>
      </CRow>
    </CCard>
  )
}

export default Banner
