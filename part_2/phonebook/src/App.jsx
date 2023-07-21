import { useEffect } from "react";
import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().match(filter)
  );

  const numbersToShow = filter !== "" ? filtered : persons;

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const addNumber = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const names = persons.map((person) => person.name);
    if (!names.includes(newName))
      personService
        .create(newPerson)
        .then(setPersons(persons.concat(newPerson)));
    else alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
  };

  const deleteNumber = (id) =>
    setPersons(persons.filter((person) => person.id !== id));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={(e) => setFilter(e.target.value)} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        handleName={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumber={(e) => setNewNumber(e.target.value)}
        handleSubmit={addNumber}
      />
      <h2> Numbers</h2>
      <Persons persons={persons} numbersToShow={numbersToShow} deleteNumber={deleteNumber}/>
    </div>
  );
};

export default App;

