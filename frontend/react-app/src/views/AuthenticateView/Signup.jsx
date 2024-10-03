import React, { useState } from "react";
import Label from "../../components/label/Label";
import InputField from "../../components/inputfield/InputField";
import AddButton from "../../components/buttons/AddButton";
import axios from "axios";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [role, setRole] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [messageColor, setMessageColor] = useState(false);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/common/api/register`,
        {
          firstname,
          lastname,
          username,
          password,
          role,
        }
      );
      if (res) {
        setSuccessMessage(res.data.message);
      }
      if (res.data.status) {
        setMessageColor(true);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (err) {
      console.log("error in backend", err);
    }
  };

  const hadleShow = () => {
    setType("text");
  };
  const handleHide = () => {
    setType("password");
  };

  return (
    <div className="bg-[url('./images/wellcome.jpg')] h-screen w-full bg-cover bg-no-repeat min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Signup
        </h2>

        <div>
          <div>
            <Label
              title="Firstname"
              className=" font-bold block text-gray-700"
            />
            <InputField
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firtsname"
              value={firstname}
              placeholder={`enter firstname ${firstname}`}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <Label title="Lastname" className="block text-gray-700" />
            <InputField
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name={lastname}
              value={lastname}
              placeholder="enter lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <Label title="Username" className="block text-gray-700" />
            <InputField
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name={username}
              value={username}
              placeholder="enter username or email"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <Label title="Password" className="block text-gray-700" />
            <InputField
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={type}
              name={password}
              value={password}
              placeholder="enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <AddButton
              className="absolute top-6 right-4 p-2"
              name={
                type === "text" ? <EyeInvisibleOutlined /> : <EyeOutlined />
              }
              onClick={type === "text" ? () => handleHide() : () => hadleShow()}
              disabledStatus={password ? false : true}
            />
          </div>
          <div className="mt-4">
            <Label title="User Type" className="block text-gray-700" />
            <select
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="userType"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select user type</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <AddButton
            name="Submit"
            className=" mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={() => handleSubmit()}
            disabledStatus={
              firstname && lastname && username && password && role
                ? false
                : true
            }
          />
          <div
            className={
              messageColor
                ? "font-medium text-blue-600 mt-3"
                : "font-medium text-red-500 mt-3"
            }
          >
            {successMessage}
          </div>
          <div className=" mt-2">
            <Link
              to="/login"
              className=" font-bold hover:text-blue-500 transition-colors duration-200 "
            >
              <ArrowLeftOutlined /> Go to Login page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
