import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/inputfield/InputField";
import Label from "../../components/label/Label";
import AddButton from "../../components/buttons/AddButton";
import axios from "axios";

export default function Forgot() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpReceived, setIsOtpReceived] = useState(false);
  const [isOtpVerify, setIsVerify] = useState(false);
  const [message, setMessage] = useState("");

  const [isDisable, setIsDisable] = useState(true);

  const handleOtp = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/otp-sent`,
      { email: username }
    );
    if (res.data.status) {
      alert(`${res.data.message}`);
      setIsOtpReceived(true);
    } else {
      setIsOtpReceived(false);
      alert(`${res.data.message}`);
    }
  };
  const handleOtpVerify = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/otp-verify`,
      { email: username, otp }
    );
    if (res.data.status) {
      setIsVerify(true);
      setMessage(res.data.message);
    } else {
      setMessage(res.data.message);
    }
  };

  const handleReset = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/newpassword-update`,
      { email: username, password }
    );
    if (res.data.status) {
      // setIsVerify(true);
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setMessage(res.data.message);
    }
  };

  useEffect(() => {
    if (
      username?.length > 0 &&
      username.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [username]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Forgot Password
        </h2>
        <div>
          <Label title="Username" />
          <InputField
            type="email"
            value={username}
            name={username}
            placeholder="enter username or email"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Label title="OTP" />
          <InputField
            type="text"
            value={otp}
            name={otp}
            placeholder="enter otp"
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {message}
          <Label title="Password" />
          <InputField
            type="text"
            value={password}
            name={password}
            placeholder="enter new password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AddButton
            name={
              isOtpReceived
                ? isOtpVerify
                  ? "Reset Password"
                  : "Verify Otp"
                : "Send OTP"
            }
            className="w-full bg-blue-600 text-white py-2 mt-2 rounded-md hover:bg-blue-700 transition"
            disabledStatus={isDisable}
            onClick={
              isOtpReceived
                ? isOtpVerify
                  ? () => handleReset()
                  : () => handleOtpVerify()
                : () => handleOtp()
            }
          />
        </div>
      </div>
    </div>
  );
}
