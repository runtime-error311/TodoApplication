import axios from "axios";
import { AUTH_API } from "../constants/constant";
import { EncryptionService } from "./encryptionServices";

const api = axios.create({
  baseURL: AUTH_API,
  withCredentials: true,
});

export const signup = (data) => {
  const encryptedData = EncryptionService(data);
  return api.post("/signup",{data:encryptedData});
}

export const login = (data) =>{
  const encryptedData = EncryptionService(data);
  return api.post("/login",{data:encryptedData});

} 

export const logout = () => api.get("/logout");

export const me = () => api.get("/me");
