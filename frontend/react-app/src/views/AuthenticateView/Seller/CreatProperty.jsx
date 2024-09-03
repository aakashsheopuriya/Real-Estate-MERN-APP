import React, { useState } from "react";
import Label from "../../../components/label/Label";
import InputField from "../../../components/inputfield/InputField";
import TextArea from "../../../components/textarea/TextArea";
import { InputNumber, Select } from "antd";
import axios from "axios";

export default function CreatProperty() {
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [services, setServices] = useState([]);
  const [image, setImage] = useState("");

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
  const handleCreate = async () => {
    alert("hello");
    console.log(
      "title,contact,description,address,price,services,image",
      title,
      contact,
      description,
      address,
      price,
      services,
      image
    );
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/create`,
      { title, contact, description, address, price, services }
    );
    console.log("backend seller create property backend res", res);
  };
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex justify-center ">
        <div className="grid grid-cols-2 m-5 gap-y-8 gap-x-4">
          <div className=" grid gap-y-2">
            <Label title="Title" />
            <InputField
              name="title"
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
              onChange={handleChange} className=" overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
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
              onSearch={onSearch} className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
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
            <InputField
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            {/* <Label title="Property Image"/>
          <InputField type="file"/> */}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-400"
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
