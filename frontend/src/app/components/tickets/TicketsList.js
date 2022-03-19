import React from 'react'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
// import Loader from 'app/components/Loader'
import { Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Ticket from './Ticket'
import TicketList from './TicketList.scss'

const TicketsList = ({ tickets }) => {
  const ticketList = tickets.map((ticket) => (
    <Ticket key={ticket._id} ticket={ticket} />
  ))

  return <div className='todos mb-3'>{ticketList}</div>
}
export default TicketsList
