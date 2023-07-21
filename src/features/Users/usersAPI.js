import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchUsers(id) {
  return axios.get(`http://localhost:8080/users/${id}`);
}
