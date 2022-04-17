import * as express from 'express'
import userController from './user.controller.js'
import { wrap } from '../../common/exceptions.js'
import authorizeRequest from '../../middlewares/authorizeRequest.middleware.js'
import ROLE from './role.model.js'

export default express
  .Router()
  .get('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.index)
  ])
  .get('/me', wrap(userController.me))
  .put('/me', wrap(userController.updateMe))
  .put('/me/change-password', wrap(userController.changeMyPassword))
  .put('/me/generate-sso', wrap(userController.generateSso))
  .post('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.create)
  ])
  .get('/', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.index)
  ])
  .get('/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.byId)
  ])
  .put('/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.update)
  ])
  .put('/activate/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.activate)
  ])
  .delete('/:id', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.delete)
  ])
  .get('/search/:searchText', [
    wrap(authorizeRequest([ROLE.ADMIN])),
    wrap(userController.search)
  ])
