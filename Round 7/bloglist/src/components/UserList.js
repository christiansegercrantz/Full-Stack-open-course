import React  from 'react'
import { useSelector } from 'react-redux'
const _ = require('lodash')


_

const UserList = () => {

  const users = useSelector(state => state.users)



  return(
    <div>
      {users.map(u => u.name)}
    </div>
  )
}

export default UserList