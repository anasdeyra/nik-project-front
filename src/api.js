import axios from "axios";
import { API_URL } from "./consts";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("_auth")}`,
  },
});

export function getAll() {
  return api.get("/websites/getAll");
}

export function addNew(website) {
  return api.post("/websites/add", website);
}

export function deleteItem(id) {
  return api.delete(`/websites/remove/${id}`);
}

export function updateAll() {
  return api.put("/websites/updateAll");
}

export function login(user) {
  return api.post("/auth/login", user);
}
