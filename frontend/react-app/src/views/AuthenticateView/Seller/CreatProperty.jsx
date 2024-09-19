import React, { useEffect, useState } from "react";
import Label from "../../../components/label/Label";
import InputField from "../../../components/inputfield/InputField";
import TextArea from "../../../components/textarea/TextArea";
import { InputNumber, Select } from "antd";
import axios from "axios";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import { useNavigate } from "react-router-dom";

export default function CreatProperty() {
  const navigate = useNavigate();
  const id = localStorage.getItem("email");
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(true);
  const [message, setMessage] = useState("");

  const handleChange = (value) => {
    setPrice(value);
  };
  const onChange = (value) => {
    setServices(value);
  };

  "services", services;
  const onSearch = (value) => {};
  const imageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(window.URL.createObjectURL(e.target.files[0]));
  };
  const handleCreate = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/create/${id}`,
      { title, contact, description, address, price, services },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.status) {
      const result = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/api/upload/${res.data.property._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(result.data.message, ", Redirecting to my properties page");
      setTimeout(() => {
        navigate("/seller-dashboard/my-property");
      }, 2000);
    } else {
      setMessage(res.data.message);
    }
  };
  const items = [
    {
      title: "home",
    },
    {
      title: "create property",
    },
  ];

  useEffect(() => {
    if (
      title?.trim().length > 0 &&
      contact?.trim().length > 0 &&
      description?.trim()?.length > 0 &&
      address?.trim().length > 0 &&
      price > 0 &&
      services?.length > 0 &&
      imagePreview
    ) {
      setIsButtonDisable(false);
    } else {
      setIsButtonDisable(true);
    }
  }, [title, contact, description, address, price, services, imagePreview]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 my-10">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <div className="mb-6">
          <BreadCrumbs items={items} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-y-2">
            <Label title="Title" />
            <InputField
              name="title"
              value={title}
              placeholder="Enter property title"
              className="border border-gray-400 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-y-2">
            <Label title="Contact no." />
            <InputField
              name="contact"
              placeholder="Enter contact"
              className="border border-gray-400 rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="grid gap-y-2 md:col-span-2">
            <Label title="Description" />
            <TextArea
              name="Description"
              placeholder="Enter description"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-y-2 md:col-span-2">
            <Label title="Address" />
            <TextArea
              name="Address"
              placeholder="Enter address"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mt-4 grid gap-y-2">
            <Label title="Property Price" />
            <InputNumber
              min={1}
              max={10000000}
              defaultValue={0}
              onChange={handleChange}
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            />
          </div>

          <div className="mt-4 grid gap-y-2">
            <Label title="Property Services" />
            <Select
              showSearch
              placeholder="Select a service"
              optionFilterProp="label"
              mode="multiple"
              onChange={onChange}
              onSearch={onSearch}
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              options={[
                { value: "Parking available", label: "Parking available" },
                { value: "Garden and park", label: "Garden and park" },
                { value: "Temple", label: "Temple" },
                {
                  value: "Small Grocery and medical shop",
                  label: "Small Grocery and medical shop",
                },
              ]}
            />
          </div>

          <div className="grid gap-y-2">
            <Label title="Property Image" />
            <InputField type="file" onChange={(e) => imageChange(e)} />
          </div>

          {imagePreview && (
            <div className="flex justify-center">
              <img
                src={imagePreview}
                alt="not found"
                className="w-24 h-24 object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className={`bg-blue-700 text-white p-3 rounded-xl hover:bg-blue-500 transition-all ${
              isButtonDisable
                ? "cursor-not-allowed bg-blue-400"
                : "cursor-pointer"
            }`}
            onClick={handleCreate}
            disabled={isButtonDisable}
          >
            Create
          </button>
        </div>
        <div className="font-medium text-blue-600 mt-3 flex items-center justify-center">
          {message}
        </div>
      </div>
    </div>
  );
}
