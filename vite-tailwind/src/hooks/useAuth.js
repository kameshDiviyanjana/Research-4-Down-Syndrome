import { createContext, useContext } from "react";
import { initialState } from "../context/authReducer";

const AuthContext = createContext(initialState);

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
