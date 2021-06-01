let timer

export const setNotification = (text, delay) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: text
    })
    clearTimeout(timer)
    timer =  setTimeout(() => {
      dispatch({
        type: 'SET',
        data: ''
      })
    }, delay*1000) 

  }
}

const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch(action.type){ 
    case 'SET':
      return action.data
    default:
      return state
  }
}


export default notificationReducer