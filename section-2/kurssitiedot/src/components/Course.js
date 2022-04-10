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
      <h2>{props.text}</h2>
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
      <p style={{ fontWeight: 'bold' }}>Total of {totalExercises} exercises.</p>
    </div>
  );
};

const Course = ({ course }) => (
  <div>
    <Header text={course.name} />
    <Content parts={course.parts} />
  </div>
);

export default Course;
