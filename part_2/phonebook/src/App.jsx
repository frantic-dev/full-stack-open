import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "39-44-5323523" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name);
    if (!names.includes(newName))
      setPersons((persons) => persons.concat({ name: newName, number: newNumber }));
    else alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}{" "}
        </div>
      ))}
    </div>
  );
};

export default App;

