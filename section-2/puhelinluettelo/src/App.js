import { useEffect, useState } from 'react';
import personService from './services/persons';

const Notification = ({ message, success }) => {
  if (message === null) {
    return null;
  }
  if (success) {
    return <div className='notification'>{message}</div>;
  }
  return (
    <div className='notification' style={{ color: 'red' }}>
      {message}
    </div>
  );
};

const Contact = ({ person, setPersons, setNotification }) => {
  const deletePerson = () => {
    if (window.confirm(`Deleting ${person.name} from contacts.`)) {
      personService.del(person.id).then(() => {
        console.log(`${person.name} removed`);
        setPersons((persons) =>
          persons.filter((filterPerson) => filterPerson.id !== person.id)
        );
        setNotification({
          message: `${person.name} has been deleted from contacts.`,
          success: true,
        });
        setTimeout(
          () => setNotification({ message: null, success: true }),
          3000
        );
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
  const [notification, setNotification] = useState({
    message: null,
    success: true,
  });

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
      personService
        .overwriteNumber(personToOverwrite.id, newNumber)
        .then(() => {
          personToOverwrite.number = newNumber;
          setPersons(persons);
          setNotification({
            ...notification,
            message: `Number of ${newName} has been updated.`,
          });
          setTimeout(
            () => setNotification({ ...notification, message: null }),
            3000
          );
        })
        .catch((error) => {
          setNotification({
            message: `${newName} has already been deleted from contacts.`,
            success: false,
          });
          setTimeout(
            () => setNotification({ message: null, success: true }),
            3000
          );
          setPersons(persons.filter((person) => person.name !== newName));
        });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .add(personObject)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNotification({
            ...notification,
            message: `${newName} has been added to contacts.`,
          });
          setTimeout(
            () => setNotification({ ...notification, message: null }),
            3000
          );
        })
        .catch((error) => {
          console.log(error.response.data);
          setNotification({
            ...notification,
            message: error.response.data.error.message,
            success: false,
          });
          setTimeout(
            () => setNotification({ ...notification, message: null }),
            3000
          );
        });
    }

    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <Notification {...notification} />
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
