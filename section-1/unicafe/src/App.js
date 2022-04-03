import { useState } from 'react';

const Header = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

const Button = (props) => {
  console.log(props);

  const addClick = () => props.set(props.amount + 1);

  return <button onClick={addClick}> {props.text} </button>;
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return <p>No feedback given </p>;
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{(good - bad) / total}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{(good / total) * 100 + ' %'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text={'give feedback'} />
      <Button text={'good'} amount={good} set={setGood} />
      <Button text={'neutral'} amount={neutral} set={setNeutral} />
      <Button text={'bad'} amount={bad} set={setBad} />
      <Header text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
