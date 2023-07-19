import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const names = persons.map((person) => person.name);
    if (!names.includes(newName))
      setPersons((persons) => persons.concat({ name: newName }));
    else alert(`${newName} is already added to phonebook`)
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2> Numbers</h2>
      {persons.map((person) => (
        <div key={person.name}>{person.name} </div>
      ))}
    </div>
  );
};

export default App;

