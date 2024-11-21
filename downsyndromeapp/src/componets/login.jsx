import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirecting

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (event) => {
    event.preventDefault();

    if (email === "user@1" && password === "123456") {
      localStorage.setItem("log", "true");
      localStorage.setItem("loginTime", Date.now());
      setIsAuthenticated(true); // Update state for authentication
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid email or password");
    }
  };



  return (
    <div>
      <div className=" grid grid-cols-2">
        <div className=" max-lg:hidden ">
          <img
            src="https://blog.miacademy.co/wp-content/uploads/2024/03/shutterstock_1934814437-scaled.jpg"
            alt="image-home"
            className="w-full h-[750px]    object-cover"
          />
        </div>
        {/* <div>
          <div className="  bg-red-600 ml-12 mr-12">
            <form className=" flex flex-col justify-center">
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Email" />
              <button>Login</button>
            </form>
          </div>
        </div> */}
        <div>
          <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className=" bg-blue-200 text-white rounded-lg shadow-lg w-full max-w-md p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
              <form className="flex flex-col space-y-4" onSubmit={login}>
                <input
                  type="email"
                  placeholder="Email"
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus: ring-blue-900 text-black"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus: ring-blue-900 text-black"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                
                <button
                  className=" bg-[#F18F02]  font-bold py-2 rounded-md hover:bg-blue-900 hover:text-white transition duration-300"
                  onClick={login}
                >
                  Login
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}{" "} 
            
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
