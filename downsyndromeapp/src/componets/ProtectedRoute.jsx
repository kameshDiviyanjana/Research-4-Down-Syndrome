import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function ProtectedRoute({ children }) {
  const { authState } = useContext(AuthContext);

  if (!authState.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
