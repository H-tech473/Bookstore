import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchUsers(id) {
  return axios.get(`http://localhost:8080/users/${id}`);
}

export function updatePut(action) {
  return axios.put(`http://localhost:8080/users/${action.id}`, action.change)
}

export function updateuserPatch(action) {
  return axios.patch(`http://localhost:8080/users/${action.id}`, action.change)
}
