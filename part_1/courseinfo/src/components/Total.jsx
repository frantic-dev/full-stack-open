const Total = (props) => {
  let total = props.exercises1 + props.exercises2 + props.exercises3;
  return <div>Number of exercises {total} </div>;
};
export default Total;
