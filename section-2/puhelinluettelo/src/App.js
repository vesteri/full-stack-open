import { useEffect, useState } from 'react';
import personService from './services/persons';

const Contacts = ({ persons, filter }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(filter.toUpperCase())
  );
  return (
    <>
      <h2>Contacts</h2>
      {filteredPersons.map((person) => (
        <p key={person.name}>{`${person.name} ${person.number}`}</p>
      ))}
    </>
  );
};

const Input = ({ header, inputString, set }) => {
  return (
    <div>
      {header}
      <input
        value={inputString}
        onChange={(event) => set(event.target.value)}
      />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    personService.getAll().then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);
  console.log('render', persons.length, 'notes');

  const handleAdd = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target, newName);
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.add(personObject).then((response) => {
        setPersons([...persons, response.data]);
      });
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Input
        header={'Filter contacts: '}
        inputString={filter}
        set={setFilter}
      />
      <h2>Add a Contact</h2>
      <form onSubmit={handleAdd}>
        <Input header={'Name: '} inputString={newName} set={setNewName} />
        <Input header={'Number: '} inputString={newNumber} set={setNewNumber} />
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <Contacts persons={persons} filter={filter} />
    </div>
  );
};

export default App;
