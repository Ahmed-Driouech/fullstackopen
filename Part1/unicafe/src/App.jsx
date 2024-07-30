import { useState } from 'react'
import Display from './Components/Display.jsx'
import Button from './Components/Button.jsx'
import Statistics from './Components/Statistics.jsx'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () =>{
    setGood(good + 1)
  }

  const handleNeutral = () =>{
    setNeutral(neutral + 1)
  }

  const handleBad = () =>{
    setBad(bad + 1)
  }

  return (
    <div>
      <Display text="give feedback"/>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
      <Display text="statistics"/>
      <Statistics text="good" value={good}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="bad" value={bad}/>
    </div>
  )
}

export default App