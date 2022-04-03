import passport from 'passport'

import authRouter from './api/auth/auth.router.js'
import userRouter from './api/users/user.router.js'
import chatRouter from './api/chats/chat.router.js'
import ticketRouter from './api/tickets/ticket.router.js'
// import accountRouter from './api/accounts/account.router.js'

import authorizeRequest from './middlewares/authorizeRequest.middleware.js'
import ROLE from './api/users/role.model.js'
import { setLang } from './middlewares/lang.middleware.js'

// APP ROUTES

export default function routes (app) {
  // API ROUTES
  app.use('/api/v1/auth', authRouter)
  app.use('/api/v1/users', passport.authenticate('jwt', { session: false }), setLang(), userRouter)
  app.use('/api/v1/tickets', passport.authenticate('jwt', { session: false }), setLang(), ticketRouter)
  app.use('/api/v1/chats', passport.authenticate('jwt', { session: false }), setLang(), chatRouter)
  // app.use('/api/v1/accounts', passport.authenticate('jwt', { session: false }), setLang(), authorizeRequest([ROLE.ADMIN]), accountRouter)
}
