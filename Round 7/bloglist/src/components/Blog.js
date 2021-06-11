import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import blogService from '../services/blogs'

import {  removeBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)

  if (!blog) {
    return null
  }

  const handleLikeBlog = async () => {
    try{
      dispatch(likeBlog(blog))
      dispatch(setSuccessNotification(`${blog.title}  has been liked!`))
      blog.likes = blog.likes +1
    }
    catch (e) {
      console.log('Error liking blog:', e)
      dispatch(setErrorNotification(`Could not like ${blog.title} because: ${e}`))
    }
  }

  const handleDeleteBlog = async () => {
    try{
      blogService.setToken(user.token)
      dispatch(removeBlog(blog))
      history.push('/')
      dispatch(setSuccessNotification(`${blog.title}  has been removed!`))
    }
    catch (e) {
      console.log('Error deleting blog:', e)
      dispatch(setErrorNotification(`Could not delete ${blog.title} because: ${e}`))
    }
  }

  const handleAddComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blog, content))
    setContent('')
  }

  const commentsForBlog = blog.comments.map(c => {
    return(<li key = {c.id}>{c.content}</li> )})



  return(
    <div className = 'blogDetails'>
      <h2>{blog.title}</h2>
      <span className = 'url'><a href ={blog.url}>{blog.url}</a> </span><br/>
      <span className = 'likes'>likes {blog.likes} <button onClick={handleLikeBlog}>Like</button> </span><br/>
      <span className = 'userName'>Added by {blog.user?blog.user.name:'User deleted'}</span> <br/>
      <button onClick={handleDeleteBlog}>Remove</button>
      <div>
        <h3>Comments</h3>
        <form onSubmit = {handleAddComment}>
          <input
            type = "text"
            id = "content"
            value = {content}
            name = "Content"
            onChange = {({ target }) => setContent(target.value)}/>
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {commentsForBlog}
        </ul>
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object
}


export default Blog