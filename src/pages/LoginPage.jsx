import { Button, Divider, Form, Input, message, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/apiAuth";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../redux/account/accountSlice";

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { username, password } = values;

    setIsLogin(true);
    const res = await login({ username, password });
    setIsLogin(false);

    if (res.data?.user) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));
      message.success("Login successful");
      navigate("/");
    } else {
      notification.error({
        message: "Login failed",
        description: res.message ?? "Unknown error",
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-gray-50 w-screen h-screen p-5 md:p-12 flex justify-center items-center">
      <div className="bg-white max-w-[600px] md:px-8 md:py-7 px-4 py-4 rounded-md shadow-md flex-1">
        <h1 className="text-center text-xl font-semibold tracking-wider md:text-3xl">
          Login
        </h1>
        <Divider />
        <Form
          name="basic"
          //   style={{
          //     maxWidth: 600,
          //     margin: "0 auto",
          //   }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            labelCol={{
              span: 24,
            }}
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input disabled={isLogin} />
          </Form.Item>

          <Form.Item
            label="Password"
            labelCol={{
              span: 24,
            }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password disabled={isLogin} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
              disabled={isLogin}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="flex flex-row gap-3 items-center mb-2">
          <span className="flex-1 border-b-[1px] border-b-gray-200"></span>
          <span>Or</span>
          <span className="flex-1 border-b-[1px] border-b-gray-200"></span>
        </div>
        <p>
          Don&apos;t have an account?{" "}
          <span
            className="text-blue-500 italic hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            register
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
