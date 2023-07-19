import { useState } from "react";

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
        persons.concat({ name: newName, number: newNumber })
      );
    else alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <label htmlFor="filter">filter shown with</label>
        <input
          type="search"
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2> Numbers</h2>
      {numbersToShow.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;

