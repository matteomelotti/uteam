import React from 'react'

const BaseFooter = () => {
  return (
    <footer className='fixed-bottom footer text-center mt-auto py-3 bg-light app-footer text-muted'>
      <div className='ml-auto'>
        <span>Powered by </span>
        <a href='/#'>Dev</a>
      </div>
    </footer>
  )
}

export default BaseFooter
