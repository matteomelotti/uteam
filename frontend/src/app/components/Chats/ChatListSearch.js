import React from 'react'
import { useHistory } from 'react-router-dom'
import AutoComplete from '../Autocomplete/Autocomplete'

function ChatListSearch ({ chats, setChats }) {
  const history = useHistory()

  const addChat = result => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter(chat => chat.messagesWithId === result._id).length > 0

    if (alreadyInChat) {
      return history.push(`/chats?chat=${result._id}`)
    } else {
      const newChat = {
        messagesWithId: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        profilePicUrl: result.profilePicUrl,
        lastMessage: '',
        date: Date.now()
      }

      setChats(prev => [newChat, ...prev])

      return history.push(`/chats?chat=${result._id}`)
    }
  }

  return (
    <AutoComplete
      onResultSelect={(data) => addChat(data)}
      url='/users/search'
    />
  )
}

export default ChatListSearch
