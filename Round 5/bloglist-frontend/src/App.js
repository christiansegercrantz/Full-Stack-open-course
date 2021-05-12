import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

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


  const Notification = ({message, color}) => {
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
      <div style = {style}>
        {message}
      </div>
    )
  }

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
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Successfully logged in')
    }
    catch (e) {
      console.log("Error logging in:", e)
      showNotification('Invalid username or password', true)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedUser')
      window.location.reload(false);
    }
    catch (e) {
      console.log("Error logging out:", e)
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
      console.log("Error adding blog:", e)
      showNotification(`Could not add ${newBlogObj.title} by ${newBlogObj.author} because: ${e}`, true)
    }
  }

  const handleLikeBlog = async (BlogObj) => {
    try{
      await blogService.addLike(BlogObj)
      showNotification(`${BlogObj.title}  has been liked!`)
    }
    catch (e) {
      console.log("Error liking blog:", e)
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
      console.log("Error deleting blog:", e)
      showNotification(`Could not delete ${BlogObj.title} because: ${e}`, true)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username: 
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password: 
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>     
  )

  const LogoutButton = () => (
    <button onClick={handleLogout}>
      Logout
    </button>
  )

  const blogForm = () => (
    <Togglable buttonLabel = "Add new note" ref={blogFormRef}>
      <BlogForm handleAddBlog = {handleAddBlog} />
    </Togglable>
  )

  const SuccessNotification = ({ message }) => {
    return(
      <Notification message = {message} color = 'green'/>
    )
  }

  const ErrorNotification = ({ message }) => {
    return(
      <Notification message = {message} color = 'red'/>
    )
  }

  const Blogs = () => {
    return(
      <div>
        <p>{user.name} logged in <LogoutButton/></p> 
        {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLikeBlog = {handleLikeBlog} handleDeleteBlog= {handleDeleteBlog}/>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <SuccessNotification message = {notificationMessage}/>
      <ErrorNotification message = {errorMessage}/>
      {user === null ?
        loginForm() :
        <Blogs/>
      }
    </div>
  )
}

export default App