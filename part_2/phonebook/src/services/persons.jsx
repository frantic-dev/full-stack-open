import axios from "axios";
const getAll = () => {
  const request = axios.get("http://localhost:3000/persons");
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post("http://localhost:3000/persons", newPerson);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete("http://localhost:3000/persons/" + id)
  return request.then(response => response.data)
}
export default {getAll, create, remove};
