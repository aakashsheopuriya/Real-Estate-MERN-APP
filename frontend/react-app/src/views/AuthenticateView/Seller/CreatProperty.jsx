import React from "react";
import Label from "../../../components/label/Label";
import InputField from "../../../components/inputfield/InputField";
import TextArea from "../../../components/textarea/TextArea";
import { InputNumber, Select } from "antd";

export default function CreatProperty() {
  const handleChange = (value) => {
    console.log("changed", value);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <div>
      <div className="grid grid-cols-2 m-5 gap-y-8">
        <div className=" grid gap-y-2">
          <Label title="Title" />
          <InputField
            name="title"
            placeholder="Enter property title "
            className="border border-gray-400  rounded-sm"
          />
        </div>
        <div className=" grid gap-y-2">
          <Label title="Contact no." />
          <InputField
            name="contact"
            placeholder="Enter conatct"
            className="border border-gray-400  rounded-sm"
          />
        </div>
        <div className=" grid gap-y-2">
          <Label title="Description" />

          <TextArea
            name="Description"
            placeholder="Enter Description"
            className="bg-slate-500"
          />
        </div>
        <div className=" grid gap-y-2">
          <Label title="Address" />

          <TextArea
            name="Address"
            placeholder="Enter Address"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
          />
        </div>

        <div className="mt-4 grid gap-y-2">
          <Label title="Property Price" />
          <InputNumber
            min={1}
            max={10}
            defaultValue={3}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4 grid gap-y-2">
          <Label title="Property services" />
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
