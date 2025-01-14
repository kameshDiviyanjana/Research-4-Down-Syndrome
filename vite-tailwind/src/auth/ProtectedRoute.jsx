

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const ProtectedRoute = () => {
  const { authState } = useContext(AuthContext);

  // Check if the user is authenticated
  if (!authState.token) {
    return <Navigate to="/login" replace />;
  }

  // Render protected routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;

