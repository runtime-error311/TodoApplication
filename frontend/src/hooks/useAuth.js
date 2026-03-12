import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import { login, logout, signup } from "../services/authServices";
import toast from "react-hot-toast";
import { emptyString } from "../constants/constant";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [name, setName] = useState(emptyString);
  const [email, setEmail] = useState(emptyString);
  const [password, setPassword] = useState(emptyString);
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signup({ name, email, password });
      toast.success(result.data.message);
      setUser(result.data.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout();
      setUser(null);
      toast.success(result?.data?.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await login({ email, password });

      toast.success(result?.data?.message);
      setUser(result?.data?.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setUser(null);
      toast.error(err?.response?.data?.message);
    }
  };
  return { loading, handleLogin, handleLogout,handleSignUp,touched,setTouched,name,setName,email,setEmail,password,setPassword };
};

export default useAuth;
