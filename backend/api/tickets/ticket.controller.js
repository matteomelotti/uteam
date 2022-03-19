import TicketService from './ticket.service.js'
import TicketValidator from './ticket.validator.js'
import _ from 'lodash'

class Controller {
  async index (req, res) {
    const tickets = await TicketService.find({ completed: false })
    return res.json(tickets)
  }

  async create (req, res) {
    const errors = await TicketValidator.onCreate(req.body)
    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details
      })
    }
    const ticketData = _.pick(req.body, ['title'])
    const ticket = await TicketService.create(ticketData)
    if (ticket) {
      return res.json(ticket)
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.'
      })
    }
  }

  async update (req, res) {
    const errors = await TicketValidator.onUpdate(req.body)
    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details
      })
    }
    const ticketData = _.pick(req.body, ['title'])
    const ticket = await TicketService.update(req.params.id, ticketData)
    if (ticket) {
      return res.json(ticket)
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.'
      })
    }
  }

  async complete (req, res) {
    const ticket = await TicketService.complete(req.params.id)
    if (ticket) {
      return res.json(ticket)
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.'
      })
    }
  }

  async delete (req, res) {
    if (req.params.id !== req.user.id) {
      await TicketService.delete(req.params.id)
      return res.json({
        success: true,
        message: 'Ticket delete successfully.'
      })
    }
    return res.status(401).json({
      success: false,
      message: 'Failed to delete user.'
    })
  }
}
export default new Controller()
