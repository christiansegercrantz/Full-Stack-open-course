import React, { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Blogs from './components/Blogs'
import Blog from './components/Blog'

import { setErrorNotification, setSuccessNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog } from './reducers/blogReducer'
import { getLoggedInUser, logoutUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/"> Blogs </Link>
      <Link style={padding} to="/users"> Users </Link>
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])


  const handleLogout = (event) => {
    event.preventDefault()
    try {
      dispatch(logoutUser())
      dispatch(setSuccessNotification('User has been successfully logged out'))
    }
    catch (e) {
      console.log('Error logging out:', e)
      dispatch(setErrorNotification(`Error while logging out encountered: ${e}`))
    }
  }

  const handleAddBlog = async (newBlogObj) => {
    try{
      blogService.setToken(user.token)
      const addedBlog = await dispatch(addBlog(newBlogObj))
      dispatch(setSuccessNotification(`${addedBlog.title} by ${addedBlog.author} has been added!`))
      blogFormRef.current.toggleVisibility()
    }
    catch (e) {
      console.log('Error adding blog:', e)
      dispatch(setErrorNotification(`Could not add ${newBlogObj.title} by ${newBlogObj.author} because: ${e}`))
    }
  }

  const matchedUser = useRouteMatch('/users/:id')
  const matchedUserObj = matchedUser
    ? users.find(u => u.id === matchedUser.params.id)
    : null

  const matchedBlog = useRouteMatch('/blogs/:id')
  const matchedBlogObj = matchedBlog
    ? blogs.find(b => b.id === matchedBlog.params.id)
    : null

  return (
    <div className = "container">
      <h1>Blogs</h1>
      <Menu/>
      <Notification />
      {user.token === '' ?
        <LoginForm /> :
        <Switch>
          <Route path ="/users/:id">
            <User user = {matchedUserObj}/>
          </Route>
          <Route path ="/blogs/:id">
            <Blog blog = {matchedBlogObj}/>
          </Route>
          <Route path ="/users">
            <UserList/>
          </Route>
          <Route path ="/">
            <Blogs handleAddBlog = {handleAddBlog} blogFormRef = {blogFormRef} handleLogout = {handleLogout}/>
          </Route>
        </Switch>

      }
    </div>
  )
}



export default App