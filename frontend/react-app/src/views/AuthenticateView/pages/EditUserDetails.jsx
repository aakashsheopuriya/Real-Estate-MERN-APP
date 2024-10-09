import React, { useContext, useEffect, useState } from "react";
import Label from "../../../components/label/Label";
import InputField from "../../../components/inputfield/InputField";
import AddButton from "../../../components/buttons/AddButton";
import axios from "axios";
import { ImageContextData } from "../../../context/ImageContextData";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function EditUserDetails() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // eslint-disable-next-line no-unused-vars
  const { imageNameData, setImageNameData } = useContext(ImageContextData);
  const email = localStorage.getItem("email");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageName, setImageName] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSaveDetails = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/user-update/${email}`,
      { firstname, lastname, address }
    );
    if (res.data.status) {
      if (imagePreview) {
        const result = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/user/api/upload/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (result.data.status) {
          setLoader(false);
          setMessage("User detais updated successfully");
          setImageNameData(result.data.image);
          setTimeout(() => {
            if (role === "seller") {
              navigate("/seller-dashboard/account-information");
            } else {
              navigate("/seller-dashboard/account-information");
            }
          }, 2000);
        } else {
          setMessage(result.data.message);
        }
      }
    }
  };

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setFirstname(res.data.user.firstname);
    setLastname(res.data.user.lastname);
    setAddress(res.data.user.address);
    setImageName(res.data.user.image);
    setId(res.data.user._id);
    setImageNameData(res.data.user.image);
  };

  const imageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    getSpecificUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  return (
    <>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit User Details
        </h2>

        {/* User Details Form */}
        <div className="space-y-4">
          <div>
            <Label
              title="Firstname"
              className="font-medium block text-gray-700 mb-2"
            />
            <InputField
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label
              title="Lastname"
              className="font-medium block text-gray-700 mb-2"
            />
            <InputField
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label
              title="Address"
              className="font-medium block text-gray-700 mb-2"
            />
            <InputField
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* User Image Upload and Preview in the Same Line */}
        <div className="flex items-center mt-6 space-x-4">
          <div>
            <Label
              title="User Image"
              className="font-medium block text-gray-700 mb-2"
            />
            <InputField
              type="file"
              onChange={imageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>

          <div className="flex-shrink-0">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <img
                src={imageName}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>

        {/* Save Button */}
        {loader ? (
          <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            className=" w-full "
          />
        ) : (
          <AddButton
            name="Save"
            className="bg-blue-700 text-white p-3 mt-6 rounded-xl w-full"
            onClick={handleSaveDetails}
          />
        )}

        <div className="font-medium text-blue-600 mt-3">{message}</div>
      </div>
    </>
  );
}
