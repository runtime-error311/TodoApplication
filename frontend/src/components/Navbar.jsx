import { useContext } from "react";
import { useState } from "react";
import UserContext from "../context/userContext";
import axios from "axios";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const VITE_API_URL = import.meta.env.VITE_API_URL;
function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await axios.get(VITE_API_URL + "auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success(result?.data?.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <nav className="w-full max-h-[20%]  rounded-t-lg shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6">
        <h2 className="text-xl font-bold text-black">Todo App</h2>

        <div className="flex items-center gap-4">
          <h3 className="text-gray-700 font-medium">Hi {user?.name}!</h3>

          <button
            disabled={loading}
            onClick={handleLogout}
            className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center min-w-[90px]"
          >
            {loading ? <ClipLoader size={25} color="white" /> : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
