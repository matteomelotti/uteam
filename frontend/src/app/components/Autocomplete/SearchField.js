import React, { useEffect, useState } from 'react'

const SearchField = ({ onSearch, isLoading, selectionMade }) => {
  const [text, setText] = useState('')
  useEffect(() => {
    setText('')
    onSearch('')
  }, [selectionMade])
  return (
    <div className='input-group position-relative'>
      <input
        className='form-control'
        placeholder='search'
        onChange={(e) => {
          setText(e.target.value)
          onSearch(e.target.value)
        }}
        value={text}
      />
      {isLoading && (
        <span
          className='position-absolute  m-1'
          style={{ right: 5, zIndex: 10000 }}
        >
          <div className='spinner-border spinner-border-small' role='status' />
        </span>
      )}
    </div>
  )
}

export default SearchField
