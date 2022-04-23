import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const exportedObject = { getAll, add, del };

export default exportedObject;
