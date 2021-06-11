import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

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
    <div>
      <Form onSubmit={addNote}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type = "text"
            id = "title"
            value = {title}
            name = "Title"
            onChange = {({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type = "text"
            id = "author"
            value = {author}
            name = "Author"
            onChange = {({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            type = "text"
            id = "url"
            value = {url}
            name = "Url"
            onChange = {({ target }) => setUrl(target.value)}
          />
          <Button type="submit" variant = "primary">Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  handleAddBlog: PropTypes.func.isRequired
}

export default BlogForm