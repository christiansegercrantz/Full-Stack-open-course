import React, {useState} from 'react'

const BlogDetails = ({blog, style, handleLikeBlog, handleDeleteBlog}) => {
  const likeBlog = () => {
    handleLikeBlog(blog)
    blog.likes = blog.likes +1
  }

  const deleteBlog = () => {
    handleDeleteBlog(blog)
  }

  return(
    <div style={style}>
      {blog.url} <br/>
      likes {blog.likes} <button onClick={likeBlog}>Like</button> <br/>
      {blog.user.name} <br/>
      <button onClick={deleteBlog}>Remove</button>
    </div>
  )
}

const Blog = ({blog, handleLikeBlog, handleDeleteBlog}) => {
  const [viewDetails, setViewDetails] = useState('View')
  const showWhenVisible = { display: viewDetails==='View' ? 'none' : '' }
  const setVisibility = () => {
    setViewDetails(viewDetails==='View' ?'Hide':"View")
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author} <button onClick={setVisibility}>{viewDetails}</button>
        <BlogDetails blog = {blog} style={showWhenVisible} handleLikeBlog = {handleLikeBlog} handleDeleteBlog = {handleDeleteBlog}/>  
      </div> 
    </div>
  ) 
}

//handleLikeBlog = {handleLikeBlog}

export default Blog