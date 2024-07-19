const Header = (prop) => {
  return (
    <h1>{prop.course}</h1>
  )
}

const Part = (prop) => {
  console.log(prop)
  return (
      <p>{prop.parts.name} {prop.parts.exercises}</p>
  )
}

const Content = (prop) => {
  console.log(prop)
  return (
    <div>
      <Part parts={prop.parts[0]} />
      <Part parts={prop.parts[1]} />
      <Part parts={prop.parts[2]} />
    </div>
  )
}

const Total = (prop) => {
  return (
    <p>
      Number of exercises{" "}
      {prop.parts[0].exercises +
        prop.parts[1].exercises +
        prop.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App