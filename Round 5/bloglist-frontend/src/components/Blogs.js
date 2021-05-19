/* eslint-disable react/prop-types */
import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

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

export default Blogs

