import React from 'react';

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  );
};

const Header = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  let totalExercises = parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
      <Part part={'Redux'} exercises={totalExercises} />
    </div>
    // I tried to call the Part component inside a forEach loop,
    // but found out that it's impossible.
  );
};

const Course = ({ course }) => (
  <div>
    <Header text={'Half Stack application development'} />
    <Content parts={course.parts} />
  </div>
);

/*
const Total = (props) => {
  let total = 0;
  props.parts.forEach((object) => {
    total += object.exercises;
  });

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};
*/

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
