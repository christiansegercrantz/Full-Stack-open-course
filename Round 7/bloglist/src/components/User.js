import React  from 'react'
import PropTypes from 'prop-types'

import { ListGroup } from 'react-bootstrap'


const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogsByUser = user.blogs.map(b => <ListGroup.Item key = {b.id}>{b.title}</ListGroup.Item>)

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {blogsByUser.length === 0
        ? 'No blogs by the user yet...'
        : <ListGroup>{blogsByUser}</ListGroup>}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User