import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const likeBlog = () => {
    handleLikeBlog(blog)
    blog.likes = blog.likes +1
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

  return(
    <div className = 'blogDetails'>
      <span className = 'url'>{blog.url} </span><br/>
      <span className = 'likes'>likes {blog.likes} <button onClick={likeBlog}>Like</button> </span><br/>
      <span className = 'userName'>{blog.user?blog.user.name:'User deleted'}</span> <br/>
      <button onClick={deleteBlog}>Remove</button>
    </div>
  )
}

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const viewHideButton = viewDetails ? 'Hide' : 'View'
  const setVisibility = () => {
    setViewDetails(!viewDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className ='blog'>
      <div>
        {blog.title} by {blog.author} <button onClick={setVisibility}>{viewHideButton}</button>
        {viewDetails && <BlogDetails blog = {blog} handleLikeBlog = {handleLikeBlog} handleDeleteBlog = {handleDeleteBlog}/>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog:PropTypes.func.isRequired
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog:PropTypes.func.isRequired
}

export default Blog