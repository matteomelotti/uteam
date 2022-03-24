import { CCol, CContainer, CRow } from '@coreui/react'

const TableLoading = () => {
  return (
    <CContainer fluid className='table-loading-container'>
      <div className='animateBg' />
      <CRow className='an-row'>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
      </CRow>
      <CRow className='an-row'>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
      </CRow>
      <CRow className='an-row'>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
        <CCol xs className='mt-2 mb-2'><div className='animate animate-item' /></CCol>
      </CRow>
    </CContainer>
  )
}

export default TableLoading
