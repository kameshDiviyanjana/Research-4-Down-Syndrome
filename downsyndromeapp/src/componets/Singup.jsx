// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "../api/apiClient";
// import { AuthContext } from "./AuthProvider";

// function Singup() {
//      const [usename, setusername] = useState("");
//      const [email, setuseremail] = useState("");
//      const [password, setuserPasswor] = useState("");
//      const { setAuthState } = useContext(AuthContext);
//      const [confirmPassword, setconfirempassword] = useState("");
//        const [error, setError] = useState("");
//         const navigate = useNavigate();
//   const registerNewuser = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await apiClient.post("/user", {
//         usename,
//         email,
//         password,
//         confirmPassword,
//       });
//             const { token, user } = response.data.data;
//       console.log(response);
//           setAuthState({ token, user });
// navigate("/dashboard");
     
//     } catch (error) {
//        setError(error.response?.data?.message );
//       // console.error("Login failed:", error.response?.data || error.message);
//       // console.log(error);
//       const errorMessage =
//         error.response?.data?.error || "An unexpected error occurred.";
//       console.error("Login failed:", errorMessage);
//     }
//   };
//   return (
//     <div>
//       <div className="bg-blue-200 text-white rounded-lg shadow-lg w-full max-w-md p-8">
//         <h2 className="text-2xl font-bold mb-6 text-center">sing up</h2>
//         <form className="flex flex-col space-y-4" onSubmit={registerNewuser}>
//           <input
//             type="text"
//             placeholder="User Name"
//             className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
//             onChange={(e) => setusername(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
//             onChange={(e) => setuseremail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="password"
//             className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
//             onChange={(e) => setuserPasswor(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password conforme"
//             className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
//             onChange={(e) => setconfirempassword(e.target.value)}
//           />
//           <button
//             className="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300"
//             type="submit"
//           >
//             Login
//           </button>
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </form>
//       </div>
//     </div>
//   );
// }


// export default Singup;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { AuthContext } from "./AuthProvider";

function Signup() {
  const [usename, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerNewUser = async (e) => {
    e.preventDefault();
setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await apiClient.post("/user", {
        usename,
        email,
        password,
        confirmPassword,
      });
      const { token, user } = response.data.data;
      setAuthState({ token, user });
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.data.message || "An unexpected error occurred.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-blue-200 text-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form className="flex flex-col space-y-4" onSubmit={registerNewUser}>
          <input
            type="text"
            placeholder="Username"
            value={usename}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300"
            type="submit"
          >
            Sign Up
          </button>
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
