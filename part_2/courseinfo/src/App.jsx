import Course from "./components/Course";
const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]} />
  </>
);

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
    {
      name: "State of a component",
      exercises: 16,
    },
    {
      name: "State of a component",
      exercises: 14,
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
      <Total
        sum={parts[0].exercises + parts[1].exercises + parts[2].exercises}
      />
    </div>
  );
};
const App2 = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 4,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 5,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 6,
      },
    ],
  };

  return <Course course={course} />;
};

export { App, App2 };

