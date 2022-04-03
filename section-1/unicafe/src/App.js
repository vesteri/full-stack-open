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

const TextRow = ({ text, amount }) => {
  return (
    <div>
      <p>
        {text} {amount}
      </p>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total === 0) {
    return <TextRow text={'No feedback given'} />;
  }
  return (
    <div>
      <TextRow text={'good'} amount={good} />
      <TextRow text={'neutral'} amount={neutral} />
      <TextRow text={'bad'} amount={bad} />
      <TextRow text={'all'} amount={total} />
      <TextRow text={'average'} amount={(good - bad) / total} />
      <TextRow text={'positive'} amount={(good / total) * 100 + ' %'} />
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
