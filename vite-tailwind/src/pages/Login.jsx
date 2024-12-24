import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Loader from "../components/Loader";
import { useAuth } from "../hooks/useAuth";
import child from "../assets/child2.png";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const onFinish = async (values) => {
    const email = values.email;
    const password = values.password;
    try {
      const response = login(email, password);
      if (response.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "ooopss",
        text: "Invalid email or password",
      });
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

          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <div className="mt-4">
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
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
                  placeholder="email"
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
                Not a member ? Register
              </Link>
            </div>
          </Form>

          {loading && <Loader />}
        </div>
      </div>

      <div>
        <img
          className="rounded-3xl lg:h-[635px] h-full w-full object-scale-down"
          src={child}
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
