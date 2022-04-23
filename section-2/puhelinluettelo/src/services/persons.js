import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const exportedObject = { getAll, add };

export default exportedObject;
