import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  loginUser } from '../reducers/userReducer'

import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'



const LoginForm = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
      dispatch(setSuccessNotification(`Successfully logged in ${user.name}`))
    }
    catch (e) {
      console.log('Error logging in:', e)
      dispatch(setErrorNotification('Invalid username or password'))
    }
  }

  return(
    <Form onSubmit={handleLogin} id='loginForm'>
      <div>
        <Form.Label>username:</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <Form.Label>password:</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button id="login-button" type="submit">login</Button>
    </Form>
  )
}

export default LoginForm