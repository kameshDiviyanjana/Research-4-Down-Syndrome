// import React, { createContext, useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const navigate = useNavigate();
//   const safelyParseJSON = (str) => {
//     try {
//       return JSON.parse(str);
//     } catch (e) {
//       console.error("Failed to parse user data from localStorage", e);
//       return null;
//     }
//   };
//   const [authState, setAuthState] = useState(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");

//     return {
//       token,
//       user: user ? safelyParseJSON(user) : null, // Safely parse user if exists
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
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const safelyParseJSON = (str) => {
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  };

  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      token,
      user: user ? safelyParseJSON(user) : null,
    };
  });
useEffect(() => {
  if (authState.token) {
    try {
      const { exp } = jwtDecode(authState.token);
      console.log("Token Expiry:", new Date(exp * 1000)); // Debugging log
      console.log("Current Time:", new Date());

      if (Date.now() >= exp * 1000 - 10000) {
        // Logout 10 sec before expiry
        logoutUser();
      }
    } catch (error) {
      console.error("JWT Decode Error:", error);
      logoutUser();
    }
  }
}, [authState.token]);

  // useEffect(() => {
  //   if (authState.token) {
  //     try {
  //       const { exp } = jwtDecode(authState.token);
  //       if (Date.now() >= exp * 1000) {
  //         logoutUser();
  //       }
  //     } catch {
  //       logoutUser();
  //     }
  //   }
  // }, [authState.token]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ token: null, user: null });
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

