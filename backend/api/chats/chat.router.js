import * as express from 'express'
import chatController from './chat.controller.js'
import { wrap } from '../../common/exceptions.js'
import authorizeRequest from '../../middlewares/authorizeRequest.middleware.js'
import ROLE from '../users/role.model.js'

export default express
  .Router()
  // .post('/', [
  //   wrap(authorizeRequest([ROLE.ADMIN])),
  //   wrap(chatController.create)
  // ])
  .get('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(chatController.index)
  ])
  // .put('/:id', [
  //   wrap(authorizeRequest([ROLE.ADMIN])),
  //   wrap(chatController.update)
  // ])
  // .delete('/:id', [
  //   wrap(authorizeRequest([ROLE.ADMIN])),
  //   wrap(chatController.delete)
  // ])
