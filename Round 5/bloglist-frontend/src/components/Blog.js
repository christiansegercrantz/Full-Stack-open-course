/* eslint-disable react/prop-types */
import React, { useState } from 'react'

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
            {blog.url} <br/>
      likes {blog.likes} <button onClick={likeBlog}>Like</button> <br/>
            {blog.user.name} <br/>
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


export default Blog