import axios from "axios";
import { TODO_API } from "../constants/constant";
import { EncryptionService } from "./encryptionServices";

const api = axios.create({
  baseURL: TODO_API,
  withCredentials: true,
});
export const getTodos = () => api.get("/");

export const createTodo = (data) =>{
  const encryptedData = EncryptionService(data);
  return api.post("/create",{data:encryptedData})
}

export const deleteTodo = (id) => api.delete(`/${id}`)

export const updateTodo = (id, data) =>{
  
  const encryptedData = EncryptionService(data);
  return api.patch(`/${id}`,{data:encryptedData});
} 