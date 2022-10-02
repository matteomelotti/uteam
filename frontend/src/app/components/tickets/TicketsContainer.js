// import { useTranslation } from 'react-i18next'
import { TicketsListQuery } from 'api/queries';
import Loader from 'app/components/Loader';
import { Container, Row } from 'react-bootstrap';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useQuery } from 'react-query';
import TicketEditor from './TicketEditor';
import './TicketsContainer.scss';
import TicketsList from './TicketsList';

const TicketsContainer = ({ user }) => {
  // const { t } = useTranslation()
  const { isLoading, error, data } = useQuery('TicketsList', TicketsListQuery, {
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <p>error</p>
  }

  return (
    <Container fluid className='bg-light'>
      <Row>
        {/* <Col className='title'>Active Tickets</Col> */}
        <TicketsList tickets={data.data} />
        <TicketEditor />
      </Row>
    </Container>
  )
}
export default TicketsContainer
