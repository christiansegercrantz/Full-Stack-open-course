import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

  const newAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(anecdote)
    props.setNotification(`You created the new anecdote: '${anecdote}'`, 5)
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


const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm