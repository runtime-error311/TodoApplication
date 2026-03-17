import { useContext } from "react";
import UserContext from "../context/userContext";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../hooks/useAuth";


function Navbar() {
  const context = useContext(UserContext);
  if(!context) throw new Error("UserContext not found!");
  const {user} = context;
  const {loading,handleLogout} = useAuth();
  return (
    <nav className="w-full rounded-t-lg shadow-lg sticky top-0 bg-purple-200 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-16 px-6 ">
        <h2 className="text-xl font-bold text-black">Todo App</h2>

        <div className="flex items-center gap-4">
          <h3 className="text-gray-700 font-medium">Hi {user?.name || "User"}!</h3>

          <button
            disabled={loading}
            onClick={handleLogout}
            className="disabled:opacity-50 bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center min-w-22.5"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Logout"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
