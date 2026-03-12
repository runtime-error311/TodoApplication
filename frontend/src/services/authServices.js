import axios from "axios";
import { AUTH_API, VITE_API_URL } from "../constants/constant";


export const signup = (data) =>
  axios.post(AUTH_API + "signup", data, { withCredentials: true });

export const login = (data) =>
  axios.post(AUTH_API + "login", data, { withCredentials: true });

export const logout = () =>
  axios.get(AUTH_API + "logout", { withCredentials: true });

export const me = () =>
  axios.get(VITE_API_URL+'me',{withCredentials:true});
