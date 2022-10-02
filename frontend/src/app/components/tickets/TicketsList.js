import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
// import Loader from 'app/components/Loader'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ListGroup } from 'react-bootstrap';
import Ticket from './Ticket';

const TicketsList = ({ tickets }) => {
  const ticketList = tickets.map((ticket) => (
    <ListGroup.Item key={ticket._id}>
      <Ticket ticket={ticket} />
    </ListGroup.Item>
  ))

  return (
    <ListGroup className='todos mb-3'>
      {ticketList}
    </ListGroup>
  )
}
export default TicketsList
