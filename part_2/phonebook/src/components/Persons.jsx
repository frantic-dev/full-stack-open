import Person from "./Person";
export default function Persons(props) {
  const persons = props.numbersToShow.map((person) => (
    <Person key={person.id} name={person.name} number={person.number} />
  ));
  return <div>{persons}</div>;
}
