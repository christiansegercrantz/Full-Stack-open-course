import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return(
    <tr><td>{text}:</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good + neutral + bad === 0) {
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const total = good + neutral + bad

  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text = "good" value = {good}/>
          <Statistic text = "natural" value = {neutral}/>
          <Statistic text = "bad" value = {bad}/>
          <Statistic text = "all" value = {total}/>
          <Statistic text = "average" value = {(good - bad) / total}/>
          <Statistic text = "positive" value = {good / total *100 + "%"}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const increaseGood = () => setGood(good +1)
const increaseNeutral = () => setNeutral(neutral +1)
const increaseBad = () => setBad(bad +1)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={increaseGood} text = "good"/>
      <Button handleClick={increaseNeutral} text = "neutral"/>
      <Button handleClick={increaseBad} text = "bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)