import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { AuthContext } from "./AuthProvider";
import Signup from "./Singup";
import Button from "./molecule/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [register, setregister] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/log", { email, password });
      console.log(response);
      const { token, safeUser } = response.data.data;
      console.log(token);
      console.log(safeUser);
      localStorage.setItem("token", token);
      localStorage.setItem("user", safeUser.username);
      localStorage.setItem("userid", safeUser._id);
      setAuthState({ token, safeUser });
      navigate("/dashboard");
    } catch (error) {
      // setError(error.response?.data?.message || "Login failed");
      // console.error("Login failed:", error.response?.data || error.message);
      // console.log(error);
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      console.error("Login failed:", errorMessage);
    }
  };

  const singinandup = () => {
    setregister(!register);
  };

  return (
    <div>
      <div className="grid lg:grid-cols-2">
        <div className="  max-lg:hidden">
          <img
            src="https://blog.miacademy.co/wp-content/uploads/2024/03/shutterstock_1934814437-scaled.jpg"
            alt="image-home"
            className="w-full h-[750px] object-cover"
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-center max-lg:p-5 lg:min-h-screen bg-gray-100">
            <div>
              <button
                className=" bg-blue-100 font-bold py-2 rounded-l-2xl  px-7 hover:bg-blue-900 hover:text-white transition duration-300 mb-5"
                type="submit"
                onClick={singinandup}
              >
                singin
              </button>
              <button
                className=" bg-blue-100 font-bold py-2  rounded-r-2xl px-7 hover:bg-blue-900 hover:text-white transition duration-300 mb-5"
                type="submit"
                onClick={singinandup}
              >
                sing-up
              </button>
            </div>
            {register ? (
              <div className="bg-blue-200 text-white rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form
                  className="flex flex-col space-y-4"
                  onSubmit={handleLogin}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-900 text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <button
                    className="bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300"
                    type="submit"
                  >
                    Login
                  </button> */}
                  <Button
                    styles={
                      "bg-[#F18F02] font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300 w-full"
                    }
                    buttonname="Login"
                    Onclick={handleLogin}
                    enterallow = {true}
                  ></Button>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
              </div>
            ) : (
              <>
                <Signup />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
