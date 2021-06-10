import usersService from '../services/users'


export const initUsers = () => {
  return async dispatch => {
    const usersFromDB = await usersService.getUsers()
    console.log(usersFromDB)
    dispatch({
      type: 'INIT',
      data: usersFromDB,
    })
  }
}

const noLoggedInUserState = []

const usersReducer = (state = noLoggedInUserState, action) => {
  switch(action.type){
  case 'INIT_USERS':
    return action.data
  default:
    return state
  }

}

export default usersReducer