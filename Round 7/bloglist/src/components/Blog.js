import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import blogService from '../services/blogs'

import {  removeBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'

import { Button, ListGroup } from 'react-bootstrap'

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
    return(<ListGroup.Item key = {c.id}>{c.content}</ListGroup.Item> )})



  return(
    <div className = 'blogDetails'>
      <h2>{blog.title}</h2>
      <h6 className = 'url'><a href ={blog.url}>{blog.url}</a> </h6><br/>
      <h6 className = 'likes'>likes {blog.likes} <Button onClick={handleLikeBlog}>Like</Button> </h6><br/>
      <h6 className = 'userName'>Added by {blog.user?blog.user.name:'User deleted'}</h6> <br/>
      <Button onClick={handleDeleteBlog}>Remove</Button>
      <div>
        <h3>Comments</h3>
        <form onSubmit = {handleAddComment}>
          <input
            type = "text"
            id = "content"
            value = {content}
            name = "Content"
            onChange = {({ target }) => setContent(target.value)}/>
          <Button type="submit">Add comment</Button>
        </form>
        <ListGroup>
          {commentsForBlog}
        </ListGroup>
      </div>
    </div>
  )
}


Blog.propTypes = {
  blog: PropTypes.object
}


export default Blog