import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {  loginUser } from '../reducers/userReducer'

import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'



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
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
      username:
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password:
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm