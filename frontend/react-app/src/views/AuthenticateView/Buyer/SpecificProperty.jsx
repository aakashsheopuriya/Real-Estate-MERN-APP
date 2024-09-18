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
  const [sellerId, setSellerId] = useState("");
  const [requestedStatus, setRequestedStatus] = useState("");

  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    if (res.data.property) {
      console.log(
        "res.data.property in specificproperty details page",
        res.data.property
      );
      setProperty(res.data.property);
      setPropertyId(res.data.property._id);
      setPropertyStatus(res.data.property.status);
      setSellerId(res.data.property.sellerId);
    } else {
      navigate("/dashboard/my-property");
      setProperty([]);
    }
  };

  const getRequestedPropertyStatus = async (userId) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-requested-property-status/${userId}/${id}`
    );
    console.log("result from requested property statius", result);
    if (result.data.property?.length > 0) {
      setRequestedStatus(result.data.property[0]?.status);
    }
  };

  console.log("requestedStatus", requestedStatus);
  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    if (res.data.user) {
      setUser(res.data.user);
      setUsername(res.data.user.username);
      setUserId(res.data.user._id);
      getRequestedPropertyStatus(res.data.user._id);
    }
  };

  const handleRequestToBuy = async (id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/add-to-request`,
      { propertyId: id, userId, username, sellerId: sellerId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("response from backend in handle to request to buy", res);
    setRequestedStatus(res.data.requestedProperty?.status);
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
  }, [requestedStatus]);

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
              title={"Send request to seller ?"}
              description=""
              onConfirm={() => handleRequestToBuy(id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              disabled={requestedStatus ? true : false}
            >
              <Button className="bg-red-500 text-white py-2 mr-2 px-4 rounded hover:bg-red-600">
                {requestedStatus === "Requested"
                  ? requestedStatus
                  : "Request to buy"}
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
