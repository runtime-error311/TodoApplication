import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getTodos = () =>
  axios.get(API + "todo", { withCredentials: true });

export const createTodo = (data) =>
  axios.post(API + "todo/create", data, { withCredentials: true });

export const deleteTodo = (id) =>
  axios.delete(API + "todo/" + id, { withCredentials: true });

export const updateTodo = (id, data) =>
  axios.patch(API + "todo/" + id, data, { withCredentials: true });