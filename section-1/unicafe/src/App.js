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

const Statistics = ({ verdict, amount }) => {
  return (
    <div>
      <p>
        {verdict} {amount}
      </p>
    </div>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let total = good + neutral + bad;

  return (
    <div>
      <Header text={'give feedback'} />
      <Button text={'good'} amount={good} set={setGood} />
      <Button text={'neutral'} amount={neutral} set={setNeutral} />
      <Button text={'bad'} amount={bad} set={setBad} />
      <Header text={'statistics'} />
      <Statistics verdict={'good'} amount={good} />
      <Statistics verdict={'neutral'} amount={neutral} />
      <Statistics verdict={'bad'} amount={bad} />
      <Statistics verdict={'all'} amount={total} />
      <Statistics verdict={'average'} amount={(good - bad) / total} />
      <Statistics verdict={'positive'} amount={(good / total) * 100 + ' %'} />
    </div>
  );
};

export default App;
