import Express from 'express'
import morgan from 'morgan'
import * as http from 'http'
import * as os from 'os'
import l from './common/logger.js'
import passport from 'passport'
import compression from 'compression'
import { handleException } from './common/exceptions.js'
import cors from 'cors'
import { setLang } from './middlewares/lang.middleware.js'
import cron from 'node-cron'
import { Server } from 'socket.io'
import './common/passport.js'
import { addUser, removeUser, findConnectedUser } from './common/roomActions.js'
import { loadMessages, sendMsg, setMsgToUnread } from './common/messageActions.js'

const app = new Express()

export default class ExpressServer {
  constructor () {
    if (process.env.ENABLE_HTTP_LOGGER === 'true') app.use(morgan('combined'))
    app.use(Express.urlencoded({ extended: false }))
    app.use(Express.json())
    app.use(cors())
    app.options('*', cors())
    app.use(compression())
    app.use(setLang())
    app.use(passport.initialize())
    app.use(function (req, res, next) {
      next()
    })
    app.use((err, req, res, next) => {
      handleException(req, res, err)
    })
  }

  router (routes) {
    routes(app)
    return this
  }

  listen (port = process.env.PORT) {
    const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`)
    const server = http.createServer(app)
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
        credentials: true
        // allowedHeaders: ['my-custom-header'],
      }
    })

    io.on('connection', socket => {
      socket.on('join', async ({
        userId
      }) => {
        let users
        if (userId && socket) {
          users = await addUser(userId, socket.id)
        }

        setInterval(() => {
          socket.emit('connectedUsers', {
            users: users.filter(user => user.userId !== userId)
          })
        }, 2000)
      })
      socket.on('disconnectUser', () => {
        removeUser(socket.id)
      })
      socket.on('loadMessages', async ({ userId, messagesWith }) => {
        const { chat, error } = await loadMessages(userId, messagesWith)
        !error ? socket.emit('messagesLoaded', { chat }) : socket.emit('noChatFound')
      })

      socket.on('sendNewMsg', async ({ userId, msgSendToUserId, msg }) => {
        const { newMsg, error } = await sendMsg(userId, msgSendToUserId, msg)
        const receiverSocket = findConnectedUser(msgSendToUserId)

        io.to(receiverSocket.socketId).emit('newMsgReceived', { newMsg })
        // if (receiverSocket) {
        //   // WHEN YOU WANT TO SEND MESSAGE TO A PARTICULAR SOCKET
        //   io.to(receiverSocket.socketId).emit('newMsgReceived', { newMsg })
        // } else {
        //   const user = await setMsgToUnread(msgSendToUserId)
        //   io.to(receiverSocket.socketId).emit('MsgToUnread', user.unreadMessage)
        // }

        !error && socket.emit('msgSent', { newMsg })
      })
    })
    server.listen(port, welcome(port))
    return this
  }

  initCron () {
    cron.schedule('1 0 * * *', () => {}, {
      scheduled: true
    })
    return this
  }
}
