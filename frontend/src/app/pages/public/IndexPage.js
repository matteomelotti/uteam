import React, { } from 'react'
// import { useTranslation } from 'react-i18next'

const IndexPage = (props) => {
  // const { t } = useTranslation()

  return (
    <div>
      <section className='d-flex align-items-center align-items-sm-center align-items-md-center align-items-lg-center mb-5 p-3' id='intro-home'>
        <div className='container-fluid d-flex justify-content-lg-center justify-content-xl-center align-items-xl-center'>
          <div className='row d-flex justify-content-center flex-md-row justify-content-xl-center'>
            <div className='col-sm-10 col-md-6 col-lg-6 col-xl-4 offset-xl-1 d-flex flex-row align-items-center align-items-sm-center align-items-md-center justify-content-lg-center align-items-lg-center justify-content-xl-center align-items-xl-center mb-3'>
              <div>
                <h1 className='text-left mb-3'><strong>Public content</strong><br /></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
export default IndexPage
