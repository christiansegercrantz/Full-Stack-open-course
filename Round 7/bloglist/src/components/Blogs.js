
import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogFormToggler = ({ handleAddBlog, blogFormRef }) => (
  <Togglable buttonLabel = 'Add new blog' ref={blogFormRef}>
    <BlogForm handleAddBlog = {handleAddBlog} />
  </Togglable>
)

const LogoutButton = ({ handleLogout }) => (
  <button onClick={() => handleLogout}>
      Logout
  </button>
)

const Blogs = ({ user, blogs, handleLikeBlog, handleDeleteBlog, handleAddBlog, blogFormRef, handleLogout }) => {

  return(
    <div>
      <p>{user.name} logged in <LogoutButton handleLogout = {handleLogout}/></p>
      {<BlogFormToggler handleAddBlog={handleAddBlog} blogFormRef={blogFormRef}/>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLikeBlog = {handleLikeBlog} handleDeleteBlog= {handleDeleteBlog}/>
      )}
    </div>
  )
}
Blogs.propTypes = {
  user: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
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

