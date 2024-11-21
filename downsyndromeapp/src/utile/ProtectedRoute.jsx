import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, isAuthenticated }) {
  return isAuthenticated ? Component : <Navigate to="/login" />;
}

export default ProtectedRoute;
