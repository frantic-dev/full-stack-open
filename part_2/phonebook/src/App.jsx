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
  const [notificationMessage, setNotificationMessage] = useState(null);

  const filtered = persons.filter((person) =>
    person.name.toLowerCase().match(filter)
  );

  const numbersToShow = filter !== "" ? filtered : persons;

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const Notification = ({ message }) => {
    return <div className="notification">{message}</div>;
  };

  const notify = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };

  const addNumber = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    const names = persons.map((person) => person.name);
    const numbers = persons.map((person) => person.number);

    if (!names.includes(newName) && !numbers.includes(newNumber)) {
      personService.create(newPerson).then(() => {
        setPersons(persons.concat(newPerson));
        notify("added " + newPerson.name);
      });
    } else if (names.includes(newName) && !numbers.includes(newNumber)) {
      if (
        window.confirm(
          "are you sure you want to replace " + newName + " 's old number?"
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        console.log(id);
        personService
          .update(id, newPerson)
          .then((updatedNumber) =>
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : updatedNumber
              )
            )
          );
          notify("changed " + newName +"'s number")
      }
    } else alert(`${newName} is already added to phonebook`);
    setNewName("");
    setNewNumber("");
  };

  const deleteNumber = (id) =>
    setPersons(persons.filter((person) => person.id !== id));

  return (
    <div>
      {notificationMessage && <Notification message={notificationMessage} />}
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
      <Persons
        persons={persons}
        numbersToShow={numbersToShow}
        deleteNumber={deleteNumber}
      />
    </div>
  );
};

export default App;

