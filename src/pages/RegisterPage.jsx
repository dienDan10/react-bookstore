import { Divider, Form, Button, Input, notification, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../services/apiAuth";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { fullName, email, password, phone } = values;

    setIsSubmit(true);
    const res = await register({ fullName, email, password, phone });
    setIsSubmit(false);
    if (res?.data?._id) {
      message.success("Register successful");
      navigate("/login");
    } else {
      notification.error({
        message: "Register failed",
        description: res.message || "unknown error",
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
          Đăng ký người dùng
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
            label="Full Name"
            labelCol={{
              span: 24,
            }}
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            labelCol={{
              span: 24,
            }}
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            labelCol={{
              span: 24,
            }}
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
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
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "20px" }}
              disabled={isSubmit}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="flex flex-row gap-3 items-center mb-2">
          <span className="flex-1 border-b-[1px] border-b-gray-200"></span>
          <span>Or</span>
          <span className="flex-1 border-b-[1px] border-b-gray-200"></span>
        </div>
        <p>
          You already have an account?
          <span
            className="text-blue-500 italic hover:underline cursor-pointer ml-2"
            onClick={() => navigate("/login")}
          >
            login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
