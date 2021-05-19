import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ message, color }) => {
  const style = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (message === '') {
    return null
  }
  return (
    <div style = {style} id="notification">
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => (
  <Notification message = {message} color = 'green'/>
)

const ErrorNotification = ({ message }) => (
  <Notification message = {message} color = 'red'/>
)


Notification.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string
}

SuccessNotification.propTypes = {
  message: PropTypes.string
}

ErrorNotification.propTypes = {
  message: PropTypes.string
}

export {
  SuccessNotification,
  ErrorNotification }