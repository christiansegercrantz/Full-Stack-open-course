import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClicks, text}) => {
  return(
    <button onClick = {handleClicks}>
      {text}
    </button>
  )
}

const LargestVote = ({anecdotes, selected}) => {
  const maxIndex = selected.votes.indexOf(Math.max(...selected.votes));
  return(
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]} <br></br>
      has {selected.votes[maxIndex]} votes</p>
    </div>
  )
}

const App = (props) => {

  const [selected, setSelected] = useState({
    anecdotes: 0,
    votes: new Array(props.anecdotes.length+1).join('0').split('').map(parseFloat)
  })

  console.log(selected.votes)

  const randomAnecdote = () => {
    const newSelected = {
      ...selected,
      anecdotes: Math.floor(Math.random() * 6)
    }
    setSelected(newSelected)
  }

  const vote = () => {
    const newSelected = {
      ...selected,
    }
    newSelected.votes[selected.anecdotes] += +1
    setSelected(newSelected)
  }

  return (
    <div>
      {props.anecdotes[selected.anecdotes]}
      <br></br>
      <Button handleClicks = {randomAnecdote} text = "next andecote"/>
      <Button handleClicks = {vote} text = "vote"/>
      <LargestVote anecdotes = {props.anecdotes} selected = {selected}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)