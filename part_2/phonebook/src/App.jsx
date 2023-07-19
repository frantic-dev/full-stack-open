import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const filtered = persons.filter((person) =>
    person.name.toLowerCase().match(filter)
  );
  const numbersToShow = filter !== "" ? filtered : persons;

  const handleSubmit = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name);
    if (!names.includes(newName))
      setPersons((persons) =>
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        })
      );
    else alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
  };

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
        handleSubmit={handleSubmit}
      />
      <h2> Numbers</h2>
      <Persons persons={persons} numbersToShow={numbersToShow} />
    </div>
  );
};

export default App;

