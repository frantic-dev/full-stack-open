export default function Person(props) {
  return (
    <div>
      {props.name} {props.number}
      <button onClick={props.handleDelete}>delete</button>
    </div>
  );
}
