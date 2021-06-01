import { useDispatch } from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(setNotification(`You created the new anecdote: '${anecdote}'`, 5))
  }

  return(
    <div>
      <h2>Create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name = 'anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm