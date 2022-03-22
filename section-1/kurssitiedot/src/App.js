const Part = (props) => {
  console.log("Part has recieved input");
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
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
    // I tried to call the Part component inside a forEach loop,
    // but found out that it's impossible.
  );
};

const Total = (props) => {
  let total = 0;
  {
    props.parts.forEach((object) => {
      total += object.exercises;
    });
  }

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
