import React from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import Loader from 'app/components/Loader'
import TicketsContainer from 'app/components/tickets/TicketsContainer'

const DashboardPage = ({ user }) => {
  return (
    <div className='dashboard-page'>
      <TicketsContainer />
    </div>
  )
}
export default DashboardPage
