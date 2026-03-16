import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import UserContext from "./context/userContext";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" />;
}

function PublicRoute({ user, children }) {
  return !user ? children : <Navigate to="/" />;
}

function App() {
  const { user } = useContext(UserContext);

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

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
