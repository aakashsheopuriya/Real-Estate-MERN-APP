import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Popconfirm, message } from "antd";
import SinglePropertyPage from "./SinglePropertyPage";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    if (res.data.property) {
      setProperty(res.data.property);
      setIsLoaded(true);
    } else {
      navigate("/seller-dashboard/my-property");
      setProperty([]);
    }
  };
  const handleDelete = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/property-delete/${id}`
    );
    if (res) {
      navigate("/seller-dashboard/my-property");
      getSpecificPropertyDetails();
    }
  };

  const handleNavigate = () => {
    navigate(`/seller-dashboard/property/${id}/edit`);
  };

  const cancel = (e) => {
    message.error("Click on No");
  };
  useEffect(() => {
    getSpecificPropertyDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="">
      <div>
        <div className="mt-5">{/* <BreadCrumbs items={items} /> */}</div>
        <div>{isLoaded && <SinglePropertyPage data={property} />}</div>
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
