import React, { useState } from 'react'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from '@fortawesome/free-solid-svg-icons'

function MessageInputField ({ sendMsg }) {
  const [text, setText] = useState('')
  // const [loading, setLoading] = useState(false)

  return (
    <div style={{ position: 'sticky', bottom: '0' }}>
      <div color='teal' attached='bottom'>
        <Form
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
              value={text}
            />
            <Button
              variant='outline-secondary'
              id='button-addon2'
              disabled={text === ''}
              // loading={loading}
              type='submit'
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
