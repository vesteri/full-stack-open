import { useEffect, useState } from 'react';
import personService from './services/persons';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className='notification'>{message}</div>;
};

const Contact = ({ person, setPersons, setNotification }) => {
  const deletePerson = () => {
    if (window.confirm(`Deleting ${person.name} from contacts.`)) {
      personService.del(person.id).then(() => {
        console.log(`${person.name} removed`);
        setPersons((persons) =>
          persons.filter((filterPerson) => filterPerson.id !== person.id)
        );
        setNotification(`${person.name} has been deleted from contacts.`);
        setTimeout(() => setNotification(null), 3000);
      });
    }
  };

  return (
    <p>
      {`${person.name} ${person.number} `}
      <button onClick={() => deletePerson()}>delete</button>
    </p>
  );
};

const Contacts = ({ persons, filter, setPersons, setNotification }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(filter.toUpperCase())
  );
  return (
    <>
      <h2>Contacts</h2>
      {filteredPersons.map((person) => (
        <Contact
          key={person.id}
          person={person}
          setPersons={setPersons}
          setNotification={setNotification}
        />
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
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log('effect');
    personService.getAll().then((response) => {
      console.log('promise fulfilled');
      setPersons(response.data);
    });
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target, newName);
    const names = persons.map((person) => person.name);
    if (names.includes(newName)) {
      if (
        !window.confirm(
          `${newName} is already in contacts. Replace their old number?`
        )
      ) {
        return;
      }
      const personToOverwrite = persons.find(
        (person) => person.name === newName
      );
      personService.overwriteNumber(personToOverwrite.id, newNumber);
      personToOverwrite.number = newNumber;
      setPersons(persons);
      setNotification(`Number of ${newName} has been updated.`);
      setTimeout(() => setNotification(null), 3000);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService.add(personObject).then((response) => {
        setPersons([...persons, response.data]);
      });
      setNotification(`${newName} has been added to contacts.`);
      setTimeout(() => setNotification(null), 3000);
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <Notification message={notification} />
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
      <Contacts
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setNotification={setNotification}
      />
    </div>
  );
};

export default App;
