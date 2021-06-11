import React  from 'react'
import PropTypes from 'prop-types'


const User = ({ user }) => {
  if (!user) {
    return null
  }

  const blogsByUser = user.blogs.map(b => <li key = {b.id}>{b.title}</li>)

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      {blogsByUser.length === 0
        ? 'No blogs by the user yet...'
        : <ul>{blogsByUser}</ul>}
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object
}

export default User