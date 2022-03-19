import Ticket from './ticket.model.js'
import BaseService from '../../services/base.service.js'

class TicketService extends BaseService {
  getModel () {
    return Ticket
  }

  async create (data) {
    const ticket = new Ticket(data)
    await ticket.save()
    return ticket
  }

  async update (ticketId, data) {
    const ticket = await this.byId(ticketId, {})
    await ticket.update({ title: data.title })

    return ticket
  }

  async complete (ticketId) {
    const ticket = await this.byId(ticketId, {})
    await ticket.update({ completed: true })

    return ticket
  }

  async delete (id) {
    const ticket = await this.byId(id, {})
    await ticket.delete()
  }
}

export default new TicketService()
