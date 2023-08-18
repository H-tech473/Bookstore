import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchUsers(id) {
  return axios.get(`http://localhost:8080/user/${id}`);
}

export function fetchUser() {
  return axios.get(`http://localhost:8080/user/-2`);
}

export function fetchallUser() {
  return axios.get(`http://localhost:8080/user`);
}

export function updateUser(num, action) {
  axios.patch(`http://localhost:8080/user/-2`, {userCount: num});
  return axios.post(`http://localhost:8080/user`, action)
}

export function updatePut(action) {
  return axios.put(`http://localhost:8080/user/${action.id}`, action.change)
}

export function updateuserPatch(action) {
  return axios.patch(`http://localhost:8080/user/${action.id}`, action.change)
}
