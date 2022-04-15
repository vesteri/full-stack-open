import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const handleAdd = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target, newName);
    const personObject = {
      name: newName,
    };
    const names = persons.map((person) => person.name);
    if (names.includes(personObject.name)) {
      window.alert(personObject.name + ' is already added to phonebook');
    } else {
      setPersons([...persons, personObject]);
    }

    setNewName('');
  };

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAdd}>
        <div>
          name:
          <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
