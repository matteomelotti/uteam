import React from 'react'
// import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Loader from 'app/components/Loader'
import { TicketsListQuery } from 'api/queries'
import { Container, Row, Col } from 'react-bootstrap'
import TicketsList from './TicketsList'
import TicketEditor from './TicketEditor'
import './TicketsContainer.scss'

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
