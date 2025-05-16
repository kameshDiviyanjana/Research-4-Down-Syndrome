// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Form, Input } from "antd";
// import { MailOutlined, LockOutlined } from "@ant-design/icons";
// import Loader from "../components/Loader";
// import { useAuth } from "../hooks/useAuth";
// import child from "../assets/child2.png";
// import { AuthContext } from "../auth/AuthProvider";
// import apiClient from "../Api/apiClient";
// import { useState, useContext } from "react";
// const Login = () => {
//   const navigate = useNavigate();
//   const { login, loading } = useAuth();
//   const onFinish = async (values) => {
//     const email = values.email;
//     const password = values.password;
//     try {
//       const response = login(email, password);
//       if (response.success) {
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "ooopss",
//         text: "Invalid email or password",
//       });
//     }
//   };

//    const [email, setEmail] = useState("");
//    const [password, setPassword] = useState("");
//    const { setAuthState } = useContext(AuthContext);
//    const [error, setError] = useState("");
//    const [register, setregister] = useState(true);

//    const handleLogin = async (e) => {
//      e.preventDefault();
//      try {
//        const response = await apiClient.post("/log", { email, password });
//        console.log(response);
//        const { token, safeUser } = response.data.data;
//        console.log(token);
//        console.log(safeUser);
//        localStorage.setItem("token", token);
//        localStorage.setItem("user", safeUser.username);
//        localStorage.setItem("userid", safeUser._id);
//        setAuthState({ token, safeUser });
//        navigate("/dashboard");
//      } catch (error) {
//        // setError(error.response?.data?.message || "Login failed");
//        // console.error("Login failed:", error.response?.data || error.message);
//        // console.log(error);
//        const errorMessage =
//          error.response?.data?.error || "An unexpected error occurred.";
//        console.error("Login failed:", errorMessage);
//      }
//    };

//    const singinandup = () => {
//      setregister(!register);
//    };
//   return (
//     <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
//       <div className="flex justify-center items-center h-full">
//         <div>
//           <span className="text-[46px] font-extrabold text-[#004AAD]">
//             Login
//           </span>
//           <h2 className="pt-8 font-semibold">Improve various skills</h2>

//           <Form name="basic" onFinish={onFinish} autoComplete="off">
//             <div className="mt-4">
//               <Form.Item
//                 name="email"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your username!",
//                   },
//                   {
//                     type: "email",
//                     message: "The input is not valid E-mail!",
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Input
//                   prefix={<MailOutlined className="site-form-item-icon" />}
//                   placeholder="email"
//                   className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                   onChange={(e)=>{
//                     setEmail(e.target.value);
//                   }}
//                 />
//               </Form.Item>
//             </div>

//             <div className="mt-2">
//               <Form.Item
//                 name="password"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please input your password!",
//                   },
//                 ]}
//                 hasFeedback
//               >
//                 <Input.Password
//                   prefix={<LockOutlined className="site-form-item-icon" />}
//                   placeholder="Password"
//                   className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//                   onChange={(e)=>{
//                      setPassword(e.target.value);
//                   }}
//                 />
//               </Form.Item>
//             </div>
//             <div className="mt-2">
//               <Form.Item>
//                 <button
//                   type="submit"
//                   className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
//                 >
//                   Login
//                 </button>
//               </Form.Item>
//             </div>
//             <div>
//               <Link to="/register" className="text-[#004AAD] hover:underline">
//                 Not a member ? Register
//               </Link>
//             </div>
//           </Form>

//           {loading && <Loader />}
//         </div>
//       </div>

//       <div>
//         <img
//           className="rounded-3xl lg:h-[635px] h-full w-full object-scale-down"
//           src={child}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };

// export default Login;

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import child from "../assets/child2.png";
import { AuthContext } from "../auth/AuthProvider";
import apiClient from "../Api/apiClient";
import { useState, useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const { setAuthState } = useContext(AuthContext);

  const [error, setError] = useState("");



  // const handleLogin = async (email, password) => {
  //   try {
  //     const response = await apiClient.post("/log", { email, password });
  //     const { token, safeUser } = response.data.data;
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", safeUser.username);
  //     localStorage.setItem("userid", safeUser._id);
  //     setAuthState({ token, safeUser });
  //     navigate("/dashboard");
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.error || "An unexpected error occurred.";
  //     setError(errorMessage);
  //     console.error("Login failed:", errorMessage);
  //   }
  // };

  const handleLogin = async (values) => {
    const { email, password } = values; // Destructure the values object
    try {
      const response = await apiClient.post("/log", { email, password });
      const { token, safeUser } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", safeUser.username);
      localStorage.setItem("userid", safeUser._id);
      setAuthState({ token, safeUser });
      navigate("/skills");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
      console.error("Login failed:", errorMessage);
    }
  };


  return (
    <div className="grid lg:grid-cols-2 px-12 pt-10 lg:pt-0 lg:px-32 gap-10">
      <div className="flex justify-center items-center h-full">
        <div>
          <span className="text-[46px] font-extrabold text-[#004AAD]">
            Login
          </span>
          <h2 className="pt-8 font-semibold">Improve various skills</h2>

          <Form name="basic" onFinish={handleLogin} autoComplete="off">
            <div className="mt-4">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
                hasFeedback
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </Form.Item>
            </div>

            <div className="mt-2">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </Form.Item>
            </div>
            <div className="mt-2">
              <Form.Item>
                <button
                  type="submit"
                  className="bg-[#004AAD] text-white font-bold px-6 py-3 rounded-md hover:bg-blue-800"
                >
                  Login
                </button>
              </Form.Item>
            </div>
            <div>
              <Link to="/register" className="text-[#004AAD] hover:underline">
                Not a member? Register
              </Link>
            </div>
          </Form>

          {loading && <Loader />}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl lg:h-[635px] h-full w-full object-scale-down"
          src={child}
          alt="Login illustration"
        />
      </div>
    </div>
  );
};

export default Login;

