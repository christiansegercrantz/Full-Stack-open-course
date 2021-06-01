import { useSelector, useDispatch } from 'react-redux'
import {addVote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector( ({anecdotes, notification, filter}) => {
    if(filter === '') 
      return anecdotes
    else 
      return anecdotes.filter(a => a.content.includes(filter))
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'` , 5))
  }

  return(
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList