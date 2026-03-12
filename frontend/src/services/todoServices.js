import axios from "axios";
import { TODO_API } from "../constants/constant";


export const getTodos = () =>
  axios.get(TODO_API, { withCredentials: true });

export const createTodo = (data) =>
  axios.post(TODO_API+ "create", data, { withCredentials: true });

export const deleteTodo = (id) =>
  axios.delete(TODO_API + id, { withCredentials: true });

export const updateTodo = (id, data) =>
  axios.patch(TODO_API + id, data, { withCredentials: true });