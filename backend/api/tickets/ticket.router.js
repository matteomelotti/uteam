import * as express from 'express'
import ticketController from './ticket.controller.js'
import { wrap } from '../../common/exceptions.js'
import authorizeRequest from '../../middlewares/authorizeRequest.middleware.js'
import ROLE from '../users/role.model.js'

export default express
  .Router()
  .post('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(ticketController.create)
  ])
  .get('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(ticketController.index)
  ])
  // .get('/:id', [
  //   wrap(authorizeRequest([ROLE.ADMIN])),
  //   wrap(userController.byId)
  // ])
  .put('/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(ticketController.update)
  ])
  .put('/:id/complete', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(ticketController.complete)
  ])
  .delete('/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(ticketController.delete)
  ])
