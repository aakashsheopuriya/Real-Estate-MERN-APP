import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Popconfirm, message } from "antd";
import SinglePropertyPage from "../Seller/SinglePropertyPage";

export default function SpecificProperty() {
  const { id } = useParams();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [propertyId, setPropertyId] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    if (res.data.property) {
      setProperty(res.data.property);
      setPropertyId(res.data.property._id);
      setPropertyStatus(res.data.property.status);
    } else {
      navigate("/dashboard/my-property");
      setProperty([]);
    }
  };

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    if (res.data.user) {
      setUser(res.data.user);
      setUsername(res.data.user.username);
      setUserId(res.data.user._id);
    }
  };

  const handleRequestToBuy = async (id) => {
    // const res = await axios.get(
    //   `${process.env.REACT_APP_BACKEND_URL}/seller/api/property-delete/${id}`
    // );
  };

  const handleAddToWishlist = async () => {
    // console.log("propertyId", propertyId);
    // console.log("propertyStatus", propertyStatus);
    // console.log("userId", userId);
    // console.log("username", username);
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/add-to-wishlist`,
      { propertyId, propertyStatus, userId, username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.status) {
      alert(`${res.data.message}`);
    } else {
      alert(`${res.data.message}`);
    }
  };

  const cancel = (e) => {
    message.error("Click on No");
  };
  useEffect(() => {
    getSpecificPropertyDetails();
    getSpecificUserDetails();
  }, []);
  return (
    <div className="py-5">
      <div>
        <div className="">{/* <BreadCrumbs items={items} /> */}</div>
        <div>
          {/* <DataCard data={property} /> */}
          <SinglePropertyPage data={property} />
        </div>
        <div className="flex justify-center items-center p-5">
          <div>
            <Popconfirm
              title="Send request to seller ?"
              description=""
              onConfirm={() => handleRequestToBuy(id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-red-500 text-white py-2 mr-2 px-4 rounded hover:bg-red-600">
                Request to buy
              </Button>
            </Popconfirm>
          </div>
          <div>
            <Popconfirm
              title="Confirm"
              description=""
              onConfirm={() => handleAddToWishlist()}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Add to Wishlist
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
}
