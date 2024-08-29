import React, { useState } from "react";
import axios from "axios";
import "./Login.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post("http://localhost:9000/api/login", {
        username: values.username,
        password: values.password,
      });
      console.log("backend res", res);
      if (res.data.status == 0) {
        // alert(`${res.data.message}`);
        setMessage(res.data.message);
      }
    } catch (err) {
      console.log("backend error", err.message);
    }
    setUsername(values.username);
    setPassword(values.password);
  };
  return (
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

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
        {message}
      </Form>
    </div>
  );
}
