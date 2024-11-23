// import React, { createContext, useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   // const [authState, setAuthState] = useState({
//   //   token: localStorage.getItem("token"),
//   //   user: JSON.parse(localStorage.getItem("user")),
//   // });
//   const navigate = useNavigate(); // Initialize navigate hook
//   const [authState, setAuthState] = useState(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     return {
//       token,
//       user: user ? JSON.parse(user) : null, // Safely parse user if exists
//     };
//   });
//   useEffect(() => {
//     if (authState.token) {
//       const { exp } = jwtDecode(authState.token);
//       if (Date.now() >= exp * 1000) {
//         logoutUser();
//       }
//     }
//   }, [authState.token]);

//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuthState({ token: null, user: null });
//     navigate("/"); // Redirect to home page
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
   const safelyParseJSON = (str) => {
     try {
       return JSON.parse(str);
     } catch (e) {
       console.error("Failed to parse user data from localStorage", e);
       return null;
     }
   };
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    return {
      token,
      user: user ? safelyParseJSON(user) : null, // Safely parse user if exists
    };
  });

  useEffect(() => {
    if (authState.token) {
      const { exp } = jwtDecode(authState.token);
      if (Date.now() >= exp * 1000) {
        logoutUser();
      }
    }
  }, [authState.token]);

 

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ token: null, user: null });
    navigate("/"); // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// import React, { createContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode"; // Ensure correct import

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [authState, setAuthState] = useState(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     return {
//       token,
//       user: user ? JSON.parse(user) : null, // Safely parse user if exists
//     };
//   });

//   useEffect(() => {
//     if (authState.token) {
//       try {
//         const { exp } = jwtDecode(authState.token);
//         if (Date.now() >= exp * 1000) {
//           logoutUser(); // Logout if token is expired
//         }
//       } catch (err) {
//         console.error("Invalid token:", err); // Handle invalid token
//         logoutUser(); // Logout to clean state
//       }
//     }
//   }, [authState.token]);

//   const logoutUser = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setAuthState({ token: null, user: null });
//   };

//   return (
//     <AuthContext.Provider value={{ authState, setAuthState, logoutUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

