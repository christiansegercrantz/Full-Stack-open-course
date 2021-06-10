import React, { useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'

import LoginForm from './components/LoginForm'

import { setErrorNotification, setSuccessNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, removeBlog, likeBlog } from './reducers/blogReducer'
import { getLoggedInUser, logoutUser } from './reducers/userReducer'


const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLoggedInUser())
  }, [])



  const handleLogout = (event) => {
    event.preventDefault()
    console.log('handleLougout ran')
    try {
      dispatch(logoutUser())
      window.localStorage.removeItem('loggedUser')
      location.reload()
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

  const handleLikeBlog = async (BlogObj) => {
    try{
      await dispatch(likeBlog(BlogObj))
      dispatch(setSuccessNotification(`${BlogObj.title}  has been liked!`))
    }
    catch (e) {
      console.log('Error liking blog:', e)
      dispatch(setErrorNotification(`Could not like ${BlogObj.title} because: ${e}`))
    }
  }

  const handleDeleteBlog = async (BlogObj) => {
    try{
      blogService.setToken(user.token)
      dispatch(removeBlog(BlogObj))
      dispatch(setSuccessNotification(`${BlogObj.title}  has been removed!`))

    }
    catch (e) {
      console.log('Error deleting blog:', e)
      dispatch(setErrorNotification(`Could not delete ${BlogObj.title} because: ${e}`))
    }
  }




  return (
    <div>
      <h2>Blogs</h2>
      <div>
        <Notification />
      </div>
      {user === null ?
        //loginForm() :
        <LoginForm /> :
        <Blogs handleLikeBlog = {handleLikeBlog} handleDeleteBlog = {handleDeleteBlog} handleAddBlog = {handleAddBlog} blogFormRef = {blogFormRef} handleLogout = {handleLogout}/>
      }
    </div>
  )
}



export default App