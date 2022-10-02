import { SocketContext } from 'context/socket'
import { useContext, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { connectedUsers as _connectedUsers, unreadMessages as _unreadMessages, user as _user } from '../state'

const withSocket = (Component) => (props) => {
  const [user] = useRecoilState(_user)
  const [unreadMessages, setUnreadMessages] = useRecoilState(_unreadMessages)
  const socket = useContext(SocketContext)
  const [connectedUsers, setConnectedUsers] = useRecoilState(_connectedUsers)

  useEffect(() => {
    if (socket && user) {
      socket.emit('join', { userId: user._id })
      socket.on('connectedUsers', ({ users }) => {
        if (users?.length > 0) setConnectedUsers(users)
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
