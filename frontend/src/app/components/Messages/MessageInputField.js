import React, { useState } from 'react'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

function MessageInputField ({ sendMsg }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ position: 'sticky', bottom: '0' }}>
      <div secondary color='teal' attached='bottom'>
        <Form
          reply
          onSubmit={e => {
            e.preventDefault()
            sendMsg(text)
            setText('')
          }}
        >
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Send New Message'
              aria-label='Send New Message'
              aria-describedby='basic-addon2'
              onChange={e => setText(e.target.value)}
            />
            <Button
              variant='outline-secondary'
              id='button-addon2'
              disabled={text === ''}
              loading={loading}
            >
              <FontAwesomeIcon icon={faPlane} />
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  )
}

export default MessageInputField
