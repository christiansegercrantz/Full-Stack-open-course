import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import { SuccessNotification,ErrorNotification } from './components/Notification'

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(
        (first, second) => second.likes - first.likes ||  first.title.localeCompare(second.title)
      ))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const blogFormRef = useRef()

  const showNotification = (message, error = false) => {
    if(error){
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    } else{
      setNotificationMessage(message)
      setTimeout(() => {
        setNotificationMessage('')
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Successfully logged in')
    }
    catch (e) {
      console.log('Error logging in:', e)
      showNotification('Invalid username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      window.location.reload(false)
    }
    catch (e) {
      console.log('Error logging out:', e)
      showNotification(`Error while logging out encountered: ${e}`, true)
    }
  }

  const handleAddBlog = async (newBlogObj) => {
    try{
      blogService.setToken(user.token)
      const addedBlog = await blogService.create(newBlogObj)
      showNotification(`${addedBlog.title} by ${addedBlog.author} has been added!`)
      setBlogs(blogs.concat(addedBlog))
      blogFormRef.current.toggleVisibility()
    }
    catch (e) {
      console.log('Error adding blog:', e)
      showNotification(`Could not add ${newBlogObj.title} by ${newBlogObj.author} because: ${e}`, true)
    }
  }

  const handleLikeBlog = async (BlogObj) => {
    try{
      await blogService.addLike(BlogObj)
      showNotification(`${BlogObj.title}  has been liked!`)
    }
    catch (e) {
      console.log('Error liking blog:', e)
      showNotification(`Could not like ${BlogObj.title} because: ${e}`, true)
    }
  }

  const handleDeleteBlog = async (BlogObj) => {
    try{
      blogService.setToken(user.token)
      await blogService.remove(BlogObj)
      showNotification(`${BlogObj.title}  has been removed!`)
      setBlogs(blogs.filter(blog => blog.id !== BlogObj.id))

    }
    catch (e) {
      console.log('Error deleting blog:', e)
      showNotification(`Could not delete ${BlogObj.title} because: ${e}`, true)
    }
  }

  const loginForm = () => (
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






  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <SuccessNotification message = {notificationMessage}/>
        <ErrorNotification message = {errorMessage}/>
      </div>
      {user === null ?
        loginForm() :
        <Blogs user = {user} blogs = {blogs} handleLikeBlog = {handleLikeBlog} handleDeleteBlog = {handleDeleteBlog} handleAddBlog={handleAddBlog} blogFormRef = {blogFormRef} handleLogout = {handleLogout}/>
      }
    </div>
  )
}



export default App