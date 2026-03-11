import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import UserContext from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
const VITE_API_URL = import.meta.env.VITE_API_URL;
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        VITE_API_URL + "auth/signup",
        { name, email, password },
        { withCredentials: true },
      );

      toast.success(result.data.message);
      setUser(result.data.data);
      setLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.data.message);
    }
  };
  return (
    <div className=" min-h-screen w-full bg-linear-to-r from-purple-100 to-pink-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md  rounded-xl">
        <form className="flex flex-col " onSubmit={(e) => handleSubmit(e)}>
          <h1 className=" text-2xl font-bold text-black my-2 mx-5">Sign Up</h1>
          <input
            className=" border-2 border-black my-2 mx-5 rounded-lg p-1 focus:ring-2 ring-black"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setTouched({ ...touched, name: false })}
            onBlur={() => setTouched({ ...touched, name: true })}
          />
          {(touched.name && name.length < 3) || name.length > 100 ? (
            <p className="text-red-500  mx-5 text-sm">
              Username must be in range of 3 to 100
            </p>
          ) : null}
          <input
            className="border-2 border-black my-2 mx-5 rounded-lg p-1 focus:ring-2 ring-black"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-black my-2 mx-5 rounded-lg p-1 focus:ring-2 ring-black"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setTouched({ ...touched, password: false })}
            onBlur={() => setTouched({ ...touched, password: true })}
          />
          {touched.password && password.length < 8 ? (
            <p className="text-red-500  mx-5 text-sm">
              Weak Password! It must be of atleast 8 characters
            </p>
          ) : null}
          <button
            className=" font-bold my-2 mx-5 rounded-lg bg-red-400 hover:bg-red-600 p-1 cursor-pointer text-white"
            disabled={loading}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
          <p className=" font-semibold mx-auto my-2">
            Already Registered?
            <Link className="text-blue-500 hover:text-blue-300" to={"/login"}>
              Login Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
