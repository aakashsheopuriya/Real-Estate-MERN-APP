import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function DataCard({ data, onClick }) {
  const role = localStorage.getItem("role");
  const [message, setMessage] = useState();
  const location = useLocation();
  const [loader, setLoader] = useState(false);

  const handleClick = async () => {
    setLoader(true);
    const isDeleted = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/remove-from-wishlist/${data._id}`
    );
    if (isDeleted) {
      setLoader(false);
      setMessage("Removed From Wishlist");
      setTimeout(() => {
        onClick();
        setMessage("");
      }, 3000);

      // navigate("/buyer-dashboard/my-wishlist");
    }
  };

  return (
    <>
      <div className="flex justify-center w-full p-4 cursor-pointer">
        {data ? (
          <div className="bg-white p-4 shadow-md rounded-lg transform transition-transform duration-300 hover:shadow-2xl hover:text-blue-500">
            <Link
              to={
                !role
                  ? "/login"
                  : role === "seller"
                  ? `/seller-dashboard/get-specific-property/${data?._id}`
                  : `/buyer-dashboard/specific/get-specific-property/${data?._id}`
              }
            >
              <div className="overflow-hidden rounded-md mb-4">
                <img
                  style={{
                    width: "300px",
                    height: "240px",
                  }}
                  src={data.image}
                  alt=""
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <h3 className="text-lg font-bold mb-2">{data?.title}</h3>
            <p className="text-gray-600">
              <EnvironmentOutlined /> Location: {data?.address}
            </p>
            <p className="text-blue-600 mt-2 font-semibold">
              &#8377;{data?.price}/- INR
            </p>
            <div>
              {location.pathname === `/buyer-dashboard/my-wishlist` &&
                (loader ? (
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    size="large"
                    className="w-full"
                  />
                ) : (
                  <button
                    onClick={handleClick}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Remove From Wishlist
                  </button>
                ))}
            </div>
            <div className="text-center m-2">{message && message}</div>
          </div>
        ) : (
          <p>No Property Found</p>
        )}
      </div>
    </>
  );
}
