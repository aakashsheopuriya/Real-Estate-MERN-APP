import React, { useState } from "react";
import Label from "../../../components/label/Label";
import InputField from "../../../components/inputfield/InputField";
import TextArea from "../../../components/textarea/TextArea";
import { InputNumber, Select } from "antd";
import axios from "axios";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";

export default function CreatProperty() {
  const id = "durgesh2@gmail.com";
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  const handleChange = (value) => {
    console.log("changed", value);
    setPrice(value);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
    setServices([...services, value]);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
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
    console.log("backend seller create property backend res", res);
    if (res.data.status) {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/seller/api/upload/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(`${res.data.message}`);
    } else {
      alert(`${res.data.message}`);
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

  // useEffe(()=>{

  // })

  return (
    <div className="relative top-11 bg-slate-100 h-screen">
      <div className="">
        <BreadCrumbs items={items} />
      </div>
      <div className="">
        <div className="flex justify-center">
          <div className="mt-9 grid grid-cols-2 m-5 gap-y-8 gap-x-4">
            <div className=" grid gap-y-2">
              <Label title="Title" />
              <InputField
                name="title"
                value={title}
                placeholder="Enter property title "
                className="border border-gray-400  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className=" grid gap-y-2">
              <Label title="Contact no." />
              <InputField
                name="contact"
                placeholder="Enter conatct"
                className="border border-gray-400  rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className=" grid gap-y-2">
              <Label title="Description" />
              <TextArea
                name="Description"
                placeholder="Enter Description"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className=" grid gap-y-2">
              <Label title="Address" />
              <TextArea
                name="Address"
                placeholder="Enter Address"
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
                className=" overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
              />
            </div>
            <div className="mt-4 grid gap-y-2">
              <Label title="Property services" />
              <Select
                showSearch
                placeholder="Select a service"
                optionFilterProp="label"
                mode="multiple"
                onChange={onChange}
                onSearch={onSearch}
                className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                options={[
                  {
                    value: "Parking available",
                    label: "Parking available",
                  },
                  {
                    value: "Garden and park",
                    label: "Garden and park",
                  },
                  {
                    value: "Temple",
                    label: "Temple",
                  },
                  {
                    value: "Small Grocery and medical shop",
                    label: "Small Grocery and medical shop",
                  },
                ]}
              />
            </div>
            <div>
              <Label title="Property Image" />
              <InputField type="file" onChange={(e) => imageChange(e)} />
            </div>
            <div>
              {/* <Label title="Property Image"/>
          <InputField type="file"/> */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="not found"
                  width={100}
                  height={100}
                ></img>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button
            className={`bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-400 ${
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
      </div>
    </div>
  );
}
