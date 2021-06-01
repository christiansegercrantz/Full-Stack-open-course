import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newAnecdote) => {
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}
 
const votedFor = async (anecdoteObj) => {
  const updatedAnecdoteObj = {
    ...anecdoteObj,
    votes : anecdoteObj.votes +1 } 
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, updatedAnecdoteObj)
  return response.data
}

export default { getAll, createNew, votedFor }