let timer

export const setErrorNotification = (text,delay = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { text, color: 'red' }
    })
    clearTimeout(timer)
    timer =  setTimeout(() => {
      dispatch({
        type: 'SET',
        data: { text: '', color: '' }
      })
    }, delay*1000)
  }
}

export const setSuccessNotification = (text,delay = 5) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { text, color: 'green' }
    })
    clearTimeout(timer)
    timer =  setTimeout(() => {
      dispatch({
        type: 'SET',
        data: { text: '', color: '' }
      })
    }, delay*1000)
  }
}

/*export const setNotification = (text, delay, color) => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: { text, color }
    })
    clearTimeout(timer)
    timer =  setTimeout(() => {
      dispatch({
        type: 'SET',
        data: { text: '', color: '' }
      })
    }, delay*1000)
  }
}*/

const initialState = { text: '', color: '' }

const notificationReducer = (state = initialState, action) => {
  switch(action.type){
  case 'SET':
    return action.data
  default:
    return state
  }
}


export default notificationReducer