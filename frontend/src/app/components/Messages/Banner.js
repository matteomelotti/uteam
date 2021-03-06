import React from 'react'
import { CCard, CCol, CRow, CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Banner ({ bannerData }) {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { firstName, lastName } = bannerData

  return (
    <CCard color='teal' attached='top'>
      <CRow>
        <CCol>
          <h4>
            {firstName} {lastName}
          </h4>
        </CCol>
        <CCol>
          <CButton
            size='sm'
            color='info'
            onClick={() => navigate('/chats', { replace: true })}
            style={{ float: 'right' }}
          >
            {t('chatsPage.closeChat')}
          </CButton>
        </CCol>
      </CRow>
    </CCard>
  )
}

export default Banner
