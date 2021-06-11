import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='toggleButtonOn' onClick={toggleVisibility} >{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className='toggleButtonOff' onClick={toggleVisibility}>Cancel</Button>
      </div>
    </div>
  )
})


Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Togglable