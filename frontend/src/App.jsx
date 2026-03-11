import { Navigate, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import UserContext from "./context/userContext";


function App() {
  const {user} = useContext(UserContext);
  console.log("hello")
  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/signup" element={!user?<Signup/>:<Navigate to={"/"}/>}/>
      <Route path="/login" element={!user?<Login/>:<Navigate to={"/"}/>} />
      <Route path="/" element={user?<Dashboard/>:<Navigate to={"/login"}/>} />
      <Route path="*" element={user?<Dashboard/>:<Navigate to={"/login"}/>} />
    </Routes>    
    
    </>
    
  )
}

export default App
