import { Button, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePropertyPage = ({ data }) => {
  const [property, setProperty] = useState({});
  const navigate = useNavigate();


  const { id } = useParams();

  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    console.log("backend res", res);
    if (res.data.property) {
      setProperty(res.data.property);
    } else {
      navigate("/dashboard/my-property");
      setProperty([]);
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/property-delete/${id}`
    );
    console.log("res", res.data.message);
    getSpecificPropertyDetails();
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

 
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
          alt="Property"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
          <p className="text-gray-600 mb-4">{data?.propertyDetails}</p>

          <h3 className="text-lg font-semibold">Services</h3>
          <p className="text-gray-600 mb-4">
            {data?.services?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </p>

          <h3 className="text-lg font-semibold">Address</h3>
          <p className="text-gray-600 mb-4">{data?.address}</p>

          <h3 className="text-lg font-semibold">Price</h3>
          <p className="text-gray-600 mb-4">{data?.price} (in INR)</p>

          <h3 className="text-lg font-semibold">Contact Number</h3>
          <p className="text-gray-600 mb-4"> +91 {data?.contactNumber}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-4">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button className="bg-red-500 text-white py-2 mr-2 px-4 rounded hover:bg-red-600">
              Delete
            </Button>
            <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Edit Details
            </Button>
          </Popconfirm>
          {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Edit Details
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
