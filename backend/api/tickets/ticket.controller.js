import _ from 'lodash';
import TicketService from './ticket.service.js';
import TicketValidator from './ticket.validator.js';

class Controller {
  async index(req, res) {
    let data = {
      completed: false,
    };
    if (req.user.role == 'user') data.assignedTo = req.user._id;
    try {
      const tickets = await TicketService.find(data);
      return res.status(200).json(tickets);
    } catch (error) {
      return res.status(422).json({
        message: 'Failed to show the tickets.',
      });
    }
  }

  async create(req, res) {
    const errors = await TicketValidator.onCreate(req.body);
    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details,
      });
    }

    const ticketData = _.pick(req.body, ['title']);
    if (req.user.role == 'user') {
      ticketData.assignedTo = req.user._id;
    }
    const ticket = await TicketService.create(ticketData);
    if (ticket) {
      return res.json(ticket);
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.',
      });
    }
  }

  async update(req, res) {
    let t = await TicketService.findById(req.params.id, {});
    if (
      req.user.role == 'user' &&
      t.assignedTo &&
      t.assignedTo.toString() != req.user._id.toString()
    ) {
      return res.status(422).json({
        success: false,
        errors: 'cannot update ticket',
      });
    }
    const errors = await TicketValidator.onUpdate(req.body);
    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details,
      });
    }
    const ticketData = _.pick(req.body, ['title']);
    let ticket = await TicketService.update(
      req.params.id,
      ticketData
    );
    if (ticket) {
      return res.json(ticket);
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.',
      });
    }
  }

  async complete(req, res) {
    const ticket = await TicketService.complete(req.params.id);
    if (ticket) {
      return res.json(ticket);
    } else {
      return res.status(422).json({
        message: 'Failed to save the ticket.',
      });
    }
  }

  async delete(req, res) {
    if (req.params.id !== req.user.id) {
      await TicketService.delete(req.params.id);
      return res.json({
        success: true,
        message: 'Ticket delete successfully.',
      });
    }
    return res.status(401).json({
      success: false,
      message: 'Failed to delete user.',
    });
  }
}
export default new Controller();
