const users = []

const addUser = async (userId, socketId) => {
  const user = users.find(user => user.userId === userId)

  if (user && user.socketId === socketId) {
    return users
  } else {
    if (user && user.socketId !== socketId) {
      await removeUser(user.socketId)
    }

    const newUser = {
      userId,
      socketId
    }

    users.push(newUser)

    return users
  }
}

const removeUser = async (socketId) => {
  const indexOf = users.map(user => user.socketId).indexOf(socketId)

  users.splice(indexOf, 1)
}

const findConnectedUser = userId => users.find(user => user.userId === userId)

export {
  addUser,
  removeUser,
  findConnectedUser
}
