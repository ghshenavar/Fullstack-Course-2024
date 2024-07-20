import { useState } from 'react'

const Display = props => <h1>{props.value}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      {value} {text === "positive" ? "%" : ""}
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) return <div>No feedback given</div>;
  return (<table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={good + neutral + bad} />
              <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)}/>
              <StatisticLine text="positive" value={(good / (good + neutral + bad)) * 100}/>
            </tbody>
          </table>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = "Give feedback"
  const statistics = "statistics"

  const setToGood = () => {
    setGood(good + 1)
  }

  const setToNeutral = () => {
    setNeutral(neutral + 1)
  }

  const setToBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Display value={feedback} />
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />

      <Display value={statistics} />
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}

export default App