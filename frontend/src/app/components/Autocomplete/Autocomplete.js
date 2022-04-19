import React, { useState } from 'react'
import { debounce } from 'lodash'
import SearchField from './SearchField'
import List from './ListItems'
import Axios from 'libs/axios'

const DEBOUNCE = 1000

const searchFun = (queryParam, apiUrl, setResults, setIsLoading) => {
  Axios.authenticated().get(`${apiUrl}/${queryParam}`)
    .then(({ data }) => {
      setIsLoading(false)
      setResults(data)
    })
}

const debouncedSearch = debounce(searchFun, DEBOUNCE)

const AutoComplete = ({ onResultSelect, url }) => {
  const [results, setResults] = useState([])
  const [selectionMade, setselectionMade] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleChange = result => {
    onResultSelect(result)
    setselectionMade(true)
  }
  const onSearch = (v) => {
    const search = debouncedSearch
    if (v) {
      setIsLoading(true)
      search(v, url, setResults, setIsLoading)
      setselectionMade(false)
    } else {
      debouncedSearch.cancel()
      setResults([])
      setIsLoading(false)
      setselectionMade(false)
    }
  }

  return (
    <div>
      <SearchField
        onSearch={onSearch}
        isLoading={isLoading}
        selectionMade={selectionMade}
      />
      {!!results.length && <List items={results} onSelect={handleChange} />}
    </div>
  )
}

export default AutoComplete
