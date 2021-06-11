
import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogFormToggler = ({ handleAddBlog, blogFormRef }) => (
  <Togglable buttonLabel = 'Add new blog' ref={blogFormRef}>
    <BlogForm handleAddBlog = {handleAddBlog} />
  </Togglable>
)

const LogoutButton = ({ handleLogout }) => {
  return(
    <Button onClick={handleLogout}>
        Logout
    </Button>
  )
}

const Blogs = ({ handleAddBlog, blogFormRef, handleLogout }) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return(
    <div>
      <p>{user.name} logged in <LogoutButton handleLogout = {handleLogout}/></p>
      <BlogFormToggler handleAddBlog={handleAddBlog} blogFormRef={blogFormRef}/>
      {blogs.map(blog =>
        <div key={blog.id} style={blogStyle}><Link  to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></div>
      )}
    </div>
  )
}
Blogs.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  blogFormRef: PropTypes.any,
  handleLogout: PropTypes.func.isRequired
}

LogoutButton.propTypes = {
  handleLogout: PropTypes.func.isRequired
}

BlogFormToggler.propTypes = {
  handleAddBlog: PropTypes.func.isRequired,
  blogFormRef:PropTypes.any
}

export default Blogs

