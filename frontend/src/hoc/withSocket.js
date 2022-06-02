import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from 'react-query'
import { Me } from 'api/queries'
import i18next from 'libs/i18n'
import Loader from 'app/components/Loader'
import { useRecoilState } from 'recoil'
import { user as _user, connectedUsers as _connectedUsers, unreadMessages as _unreadMessages } from '../state'
import { SocketContext } from 'context/socket'

const withSocket = (Component) => (props) => {
  const [user] = useRecoilState(_user)
  const [unreadMessages, setUnreadMessages] = useRecoilState(_unreadMessages)
  const socket = useContext(SocketContext)
  const [connectedUsers, setConnectedUsers] = useRecoilState(_connectedUsers)

  useEffect(() => {
    if (socket && user) {
      socket.emit('join', { userId: user._id })
      socket.on('connectedUsers', ({ users }) => {
        if (users.length > 0) setConnectedUsers(users)
      })
    }

    socket.on('newMsgReceived', async ({ newMsg }) => {
      setUnreadMessages(true)
    })

    return () => {
      if (socket) {
        socket.emit('disconnectUser')
        socket.off()
      }
    }
  }, [])

  return <Component {...props} />
}

export default withSocket
