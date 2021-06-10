import loginService from '../services/login'



export const loginUser = (username, password) => {
  return async dispatch => {
    const loggedInUser = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
    dispatch({
      type: 'LOGIN',
      data: loggedInUser,
    })
    return loggedInUser
  }
}

export const getLoggedInUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON) {
      dispatch({
        type: 'INIT_USER',
        data: JSON.parse(loggedUserJSON),
      })
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}


const noLoggedInUserState = { token: '', username: '', name: '' }

const userReducer = (state = noLoggedInUserState, action) => {
  switch(action.type){
  case 'INIT_USER':
    return action.data
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return noLoggedInUserState
  default:
    return state
  }

}

export default userReducer