import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const del = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const overwriteNumber = (id, newNumber) => {
  return axios.patch(`${baseUrl}/${id}`, { number: newNumber });
};

const exportedObject = { getAll, add, del, overwriteNumber };

export default exportedObject;
