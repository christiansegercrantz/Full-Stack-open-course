import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


export const addVote = (anecdoteObjVoted) => {
  return async dispatch => {
  const updatedAnecdote = await anecdoteService.votedFor(anecdoteObjVoted)
  dispatch({
    type: 'VOTE',
    data: {
      id: updatedAnecdote.id
    }})
  }
}

export const addAnecdote = (newAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(asObject(newAnecdote))
    dispatch({
      type: 'ADD',
      data: {...anecdote}
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotesFromDB = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotesFromDB,
    })
  }
}

const moreVotes = (first, second) => {
  return second.votes - first.votes
}

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const noteVotedFor = state.find(note => note.id === id)
      const updatedNote = {...noteVotedFor, votes: noteVotedFor.votes +1}
      return state.map(note => note.id !== id? note: updatedNote).sort(moreVotes)
    case 'ADD':
      return [...state, action.data].sort(moreVotes)
    case 'INIT': 
      return action.data.sort(moreVotes)
    default: 
      return state
  }
}

export default reducer