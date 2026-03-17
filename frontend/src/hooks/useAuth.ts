import { useContext, useState, FormEvent } from "react";
import UserContext from "../context/userContext";
import { login, logout, signup } from "../services/authServices";
import toast from "react-hot-toast";
import { emptyString } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import { UserTouched } from "../utils/validation";
import { User } from "../types/auth.types";
import axios from "axios";

const useAuth = () => {
  const [name, setName] = useState<string>(emptyString);
  const [email, setEmail] = useState<string>(emptyString);
  const [password, setPassword] = useState<string>(emptyString);
  const [loading, setLoading] = useState<boolean>(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserContext not found!");
  }

  const { setUser } = context;
  const navigate = useNavigate();

  const [touched, setTouched] = useState<UserTouched>({
    name: false,
    email: false,
    password: false,
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signup({ name, email, password });

      toast.success(result.data.message);
      setUser(result.data.data as User);

      navigate("/");
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Signup failed!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login({ email, password });

      toast.success(result.data.message);
      setUser(result.data.data as User);

      navigate("/");
    } catch (err: unknown) {
      console.error(err);
      setUser(null);

      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Login Failed!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    setLoading(true);

    try {
      const result = await logout();

      setUser(null);
      toast.success(result.data.message);
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Logout failed!");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
    handleLogout,
    handleSignUp,
    touched,
    setTouched,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
  };
};

export default useAuth;