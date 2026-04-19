import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("doctorLoggedIn");
  return isAuth ? children : <Navigate to="/login" />;
}