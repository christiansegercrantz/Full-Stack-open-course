import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (notification.text === '') {
    return null
  }
  return (
    <div style = {style} id="notification">
      {notification.text}
    </div>
  )
}


Notification.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string
}

export default Notification