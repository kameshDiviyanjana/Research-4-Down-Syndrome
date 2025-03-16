import { useReducer, useEffect, createContext } from "react";
import axios from "axios";
import { authReducer, initialState } from "./authReducer";
import { AUTH_TYPES } from "./authTypes";
import PropTypes from "prop-types";

const AuthContext = createContext(initialState);

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 5000,
});

export const AuthProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState);

  // useEffect(() => {
  //   initializeAuth();
  // }, []);

  // // Add auth token to all requests
  // useEffect(() => {
  //   const interceptor = api.interceptors.request.use((config) => {
  //     if (state.token) {
  //       config.headers.Authorization = `Bearer ${state.token}`;
  //     }
  //     return config;
  //   });

  //   return () => api.interceptors.request.eject(interceptor);
  // }, [state.token]);

  // const initializeAuth = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const response = await api.get("/auth/verify");
  //       const userData = response.data;

  //       dispatch({
  //         type: AUTH_TYPES.INITIALIZE,
  //         payload: {
  //           isAuthenticated: true,
  //           user: userData,
  //         },
  //       });
  //     } else {
  //       dispatch({
  //         type: AUTH_TYPES.INITIALIZE,
  //         payload: {
  //           isAuthenticated: false,
  //           user: null,
  //         },
  //       });
  //     }
  //   } catch (error) {
  //     localStorage.removeItem("token");
  //     console.log(error);
  //     dispatch({
  //       type: AUTH_TYPES.INITIALIZE,
  //       payload: {
  //         isAuthenticated: false,
  //         user: null,
  //       },
  //     });
  //   }
  // };

  // const login = async (email, password) => {
  //   dispatch({ type: AUTH_TYPES.LOGIN_REQUEST });

  //   try {
  //     const response = await api.post("/auth/login", {
  //       email,
  //       password,
  //     });

  //     const { token, user } = response.data;
  //     localStorage.setItem("token", token);

  //     dispatch({
  //       type: AUTH_TYPES.LOGIN_SUCCESS,
  //       payload: {
  //         user,
  //         token,
  //         role: user.role,
  //       },
  //     });

  //     return { success: true };
  //   } catch (error) {
  //     const errorMessage = error.response?.data?.message || "Login failed";
  //     dispatch({
  //       type: AUTH_TYPES.LOGIN_FAILURE,
  //       payload: errorMessage,
  //     });
  //     return { success: false, error: errorMessage };
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await api.post("/auth/logout");
  //   } finally {
  //     localStorage.removeItem("token");
  //     dispatch({ type: AUTH_TYPES.LOGOUT });
  //   }
  // };

  // const updateProfile = async (data) => {
  //   try {
  //     const response = await api.put("/auth/profile", data);
  //     dispatch({
  //       type: AUTH_TYPES.UPDATE_PROFILE,
  //       payload: response.data,
  //     });
  //     return { success: true };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: error.response?.data?.message || "Update failed",
  //     };
  //   }
  // };

  return (
    <AuthContext.Provider
     
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
