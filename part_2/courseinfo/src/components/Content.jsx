import Part from "./Part";
export default function Content(props) {
  const parts = props.parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));
  return <div>{parts} </div>;
}
