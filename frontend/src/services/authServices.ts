import axios from "axios";
import { AUTH_API } from "../constants/constant";
import { EncryptionService } from "./encryptionServices";
import { LoginPayload, SignupPayload, User } from "../types/auth.types";
import { ApiResponse } from "../types/api.types";

const api = axios.create({
  baseURL: AUTH_API,
  withCredentials: true,
});

export const signup = (data:SignupPayload) => {
  const encryptedData = EncryptionService(data);
  return api.post<ApiResponse<User>>("/signup",{data:encryptedData});
}

export const login = (data:LoginPayload) =>{
  const encryptedData = EncryptionService(data);
  return api.post<ApiResponse<User>>("/login",{data:encryptedData});

} 

export const logout = () => api.get<ApiResponse<null>>("/logout");

export const me = () => api.get<ApiResponse<{user:User}>>("/me");
