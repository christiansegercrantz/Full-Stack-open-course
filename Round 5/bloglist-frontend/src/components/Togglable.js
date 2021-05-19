/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useImperativeHandle  } from 'react'

const Togglable = React.forwardRef((props,ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => {
        console.log('visibility changed')
        setVisible(!visible)
    }

    /*useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })*/

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className='toggleButtonOn' onClick={toggleVisibility} >{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button className='toggleButtonOff' onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable