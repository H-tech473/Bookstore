import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchBooks() {
  return axios.get("http://localhost:8080/books");
}

export function fetchGenre() {
  return axios.get("http://localhost:8080/genre");
}
