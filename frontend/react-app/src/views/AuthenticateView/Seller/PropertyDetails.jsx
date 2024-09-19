import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Popconfirm, message } from "antd";
import SinglePropertyPage from "./SinglePropertyPage";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
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
    getSpecificPropertyDetails();
  };

  const handleNavigate = () => {
    navigate(`/seller-dashboard/property/${id}/edit`);
  };

  const cancel = (e) => {
    message.error("Click on No");
  };
  useEffect(() => {
    getSpecificPropertyDetails();
  }, []);
  return (
    <div className="">
      <div>
        property details
        <div className="">{/* <BreadCrumbs items={items} /> */}</div>
        <div>
          {/* <DataCard data={property} /> */}
          <SinglePropertyPage data={property} />
        </div>
        <div className="flex justify-center items-center p-5">
          <div>
            <Popconfirm
              title="Remove this property from this site?"
              description=""
              onConfirm={() => handleDelete(id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-red-500 text-white py-2 mr-2 px-4 rounded hover:bg-red-600">
                Delete
              </Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="Edit property details?"
              description=""
              onConfirm={() => handleNavigate()}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Edit
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}
