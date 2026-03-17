import axios from "axios";
import { TODO_API } from "../constants/constant";
import { EncryptionService } from "./encryptionServices";
import { ApiResponse } from "../types/api.types";
import { Todo } from "../types/todo.types";

export type CreateTodoPayload = Omit<Todo, "_id"|"user"|"completed">;
export type UpdateTodoPayload = Partial<Todo>;

const api = axios.create({
  baseURL: TODO_API,
  withCredentials: true,
});
export const getTodos = () => api.get<ApiResponse<{overdue:Todo[],upcoming:Todo[],todayTodos:Todo[]}>>("/");

export const createTodo = (data:CreateTodoPayload) =>{
  const encryptedData = EncryptionService(data);
  return api.post<ApiResponse<{newTodo:Todo}>>("/create",{data:encryptedData})
}

export const deleteTodo = (id:string) => api.delete<ApiResponse<null>>(`/${id}`)

export const updateTodo = (id:string, data:UpdateTodoPayload) =>{
  
  const encryptedData = EncryptionService(data);
  return api.patch<ApiResponse<{updatedTodo:Todo}>>(`/${id}`,{data:encryptedData});
} 