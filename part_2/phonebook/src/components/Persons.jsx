import Person from "./Person";
import personService from "../services/persons";
export default function Persons(props) {
  const deletePerson = (id) => {
    if (window.confirm("Are you sure you want to delete this number?"))
      personService.remove(id).then(() => props.deleteNumber(id));
  };

  const persons = props.numbersToShow.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      handleDelete={() => deletePerson(person.id)}
    />
  ));

  return <div>{persons}</div>;
}
