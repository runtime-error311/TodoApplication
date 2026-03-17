import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { ReactNode, useContext } from "react";
import UserContext from "./context/userContext";
import { User } from "./types/auth.types";

type Props = {
  user:User|null;
  children:ReactNode;
}
function ProtectedRoute({ user, children }:Props) {
  return user ? children : <Navigate to="/login" replace/>;
}

function PublicRoute({ user, children }:Props) {
  return !user ? children : <Navigate to="/" replace/>;
}

function App() {
  const context = useContext(UserContext);
  if(!context){
    throw new Error("UserContext not found!");
  }
  const {user} = context;

  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute user={user}>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </>
  );
}

export default App;
