
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../hooks/useAuth";

function Login() {
    const {email,setEmail,handleLogin,password,setPassword,touched,setTouched,loading} = useAuth();
  return (
    <div className=" min-h-screen w-full bg-linear-to-r from-purple-100 to-pink-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md  rounded-xl">
        <form className="flex flex-col " onSubmit={(e) => handleLogin(e)}>
          <h1 className=" text-2xl font-bold text-black my-2 mx-5">Login</h1>
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
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
          <p className=" font-semibold mx-auto my-2">
            New User?
            <Link className="text-blue-500 hover:bg-blue-300" to={"/signup"}>
              Sign Up Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
