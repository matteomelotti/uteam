import React from 'react'
import { useNavigate } from 'react-router-dom'
import AutoComplete from '../Autocomplete/Autocomplete'

function ChatListSearch ({ chats, setChats }) {
  const navigate = useNavigate()

  const addChat = result => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter(chat => chat.messagesWithId === result._id).length > 0

    if (alreadyInChat) {
      return navigate(`/chats?chat=${result._id}`, { replace: true })
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

      return navigate(`/chats?chat=${result._id}`, { replace: true })
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
