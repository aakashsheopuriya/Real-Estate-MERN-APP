import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/common/api/login`,
        {
          username: values.username,
          password: values.password,
        }
      );
      console.log("backend res", res);
      if (res.data.status == 0) {
        // alert(`${res.data.message}`);
        setMessage(res.data.message);
      } else {
        localStorage.setItem("email", values.username);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("backend error", err.message);
    }
    setUsername(values.username);
    setPassword(values.password);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Login
        </h2>
        <div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/forgot-password" className="login-form-forgot">
                Forgot Password
              </Link>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              <span className="ml-2 gap-2">
                Or <Link to="/Signup-Now">Register Now</Link>
              </span>
            </Form.Item>
            {message}
          </Form>
        </div>
      </div>
    </div>
  );
}
