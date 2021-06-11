import React  from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'


const RowInUserList = ({ user }) => {
  return(
    <tr><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
  )
}

const UserList = () => {

  const users = useSelector(state => state.users)



  return(
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr><th></th><th>Blogs created</th></tr>
          {users.map(u => <RowInUserList key = {u.id} user = {u}/>)}
        </tbody>
      </Table>
    </div>
  )
}

RowInUserList.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserList