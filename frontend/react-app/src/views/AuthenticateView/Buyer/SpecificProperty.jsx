import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Popconfirm, message } from "antd";
import SinglePropertyPage from "../Seller/SinglePropertyPage";

export default function SpecificProperty() {
  const { id } = useParams();
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [property, setProperty] = useState({});
  const [propertyId, setPropertyId] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  // const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [requestedStatus, setRequestedStatus] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [propertyTitle, setPropertyTitle] = useState("");
  const [propertyImage, setPropertyImage] = useState("");
  const [propertyPrice, setPropertyPrice] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    if (res.data.property) {
      setProperty(res.data.property);
      setPropertyId(res.data.property._id);
      setPropertyStatus(res.data.property.status);
      setSellerId(res.data.property.sellerId);
      setPropertyTitle(res.data.property.title);
      setPropertyImage(res.data.property.image);
      setPropertyPrice(res.data.property.price);
    } else {
      navigate("/dashboard/my-property");
      setProperty([]);
    }
  };

  const getRequestedPropertyStatus = async (userId) => {
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-requested-property-status/${userId}/${id}`
    );
    if (result.data.property?.length > 0) {
      setRequestedStatus(result.data.property[0]?.status);
    }
  };

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    if (res.data.user) {
      setUsername(res.data.user.username);
      setFirstname(res.data.user.firstname);
      setLastname(res.data.user.lastname);
      setUserId(res.data.user._id);
      getRequestedPropertyStatus(res.data.user._id);
    }
  };

  const handleRequestToBuy = async (id) => {
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/add-to-request`,
      {
        propertyId: id,
        userId,
        firstname,
        lastname,
        sellerId: sellerId,
        image: propertyImage,
        price: propertyPrice,
        title: propertyTitle,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setRequestedStatus(res.data.requestedProperty?.status);
  };

  const handleAddToWishlist = async () => {
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
      setConfirmMessage(res.data.message);
    } else {
      setConfirmMessage(res.data.message);
    }
  };

  const cancel = (e) => {
    message.error("Click on No");
  };
  useEffect(() => {
    getSpecificPropertyDetails();
    getSpecificUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="font-medium text-blue-600 mt-3 flex items-center justify-center">
          {confirmMessage}
        </div>
      </div>
    </div>
  );
}
