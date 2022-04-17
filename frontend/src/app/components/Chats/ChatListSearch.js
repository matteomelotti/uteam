import React, { useState, useEffect } from 'react'
import { Label, Search } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import Axios from 'libs/axios'

let cancel

function ChatListSearch ({ chats, setChats }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const history = useHistory()

  const handleChange = async e => {
    const { value } = e.target
    setText(value)
    if (value.length === 0) return
    if (value.trim().length === 0) return

    setLoading(true)

    try {
      cancel && cancel()
      // const CancelToken = axios.CancelToken
      // const token = cookie.get('token')

      const res = await Axios.authenticated().get(`/users/search/${value}`)

      if (res.data.length === 0) {
        results.length > 0 && setResults([])

        return setLoading(false)
      }

      const newResults = res.data.map((item) => ({ _id: item._id, title: item.firstName }))
      setResults(newResults)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const addChat = result => {
    const alreadyInChat =
      chats.length > 0 &&
      chats.filter(chat => chat.messagesWith === result._id).length > 0

    if (alreadyInChat) {
      return history.push(`/chats?chat=${result._id}`)
    } else {
      const newChat = {
        messagesWithId: result._id,
        name: result.title,
        profilePicUrl: result.profilePicUrl,
        lastMessage: '',
        date: Date.now()
      }

      setChats(prev => [newChat, ...prev])

      return history.push(`/chats?chat=${result._id}`)
    }
  }

  useEffect(() => {
    if (text.length === 0 && loading) setLoading(false)
  }, [text])

  return (
    <Search
      onBlur={() => {
        results.length > 0 && setResults([])
        loading && setLoading(false)
        setText('')
      }}
      loading={loading}
      value={text}
      resultRenderer={ResultRenderer}
      results={results}
      onSearchChange={handleChange}
      minCharacters={1}
      onResultSelect={(e, data) => addChat(data.result)}
    />
  )
}

const ResultRenderer = ({ title }) => <Label content={title} />

export default ChatListSearch
