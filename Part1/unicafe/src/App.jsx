import { useEffect, useState } from 'react'
import Display from './Components/Display.jsx'
import Button from './Components/Button.jsx'
import Statistics from './Components/Statistics.jsx'
import Feedback from './Components/Feedback.jsx'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  const [feedback, setFeedback] = useState(false)

  useEffect(() => {
    if(good > 0 || bad > 0 || neutral > 0 ){
      setFeedback(true)
      handleStatistics()
    }
  },[good, neutral, bad]);

  const handleGood = () =>{
    setGood(good + 1)
  }
  
  const handleNeutral = () =>{
    setNeutral(neutral + 1)
  }
  
  const handleBad = () =>{
    setBad(bad + 1)
  }
  
  const handleStatistics=()=>{
    const updatedAll = (good + neutral + bad)
    setAll(updatedAll)
    setAverage(((good + (bad * -1))/updatedAll))
    setPositive(((good/updatedAll)*100))
  }

  return (
    <div>
      <Display text="give feedback"/>
      <Button text="good" onClick={handleGood}/>
      <Button text="neutral" onClick={handleNeutral}/>
      <Button text="bad" onClick={handleBad}/>
      <Display text="statistics"/>
      <Statistics text="good" value={good} feedback={feedback}/>
      <Statistics text="neutral" value={neutral} feedback={feedback}/>
      <Statistics text="bad" value={bad} feedback={feedback}/>
      <Statistics text="all" value={all} feedback={feedback}/>
      <Statistics text="average" value={average} feedback={feedback}/>
      <Statistics text="positive" value={positive} feedback={feedback}/>
      <Feedback text="No feedback given" feedback={feedback}/>
    </div>
  )
}

export default App