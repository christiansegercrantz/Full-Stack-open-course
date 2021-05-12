import React, {useState} from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl]= useState('') 

  const addNote = (event) => {
    event.preventDefault()

    handleAddBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addNote}>
      <div>
        title:
          <input
          type = "text"
          value = {title}
          name = "Title"
          onChange = {({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author:
          <input
          type = "text"
          value = {author}
          name = "Author"
          onChange = {({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url:
          <input
          type = "text"
          value = {url}
          name = "Url"
          onChange = {({ target }) => setUrl(target.value)}/>
      </div>
      <button type="submit">Create</button>
    </form>
  )
  }

export default BlogForm