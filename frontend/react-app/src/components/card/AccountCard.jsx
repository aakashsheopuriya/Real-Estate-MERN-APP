import { LoginOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AccountCard = ({ userData, profileImage }) => {
  const [openSignoutPopup, setOpenSignoutPopup] = useState(false);
  const hideSignoutPopup = () => {
    setOpenSignoutPopup(false);
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };
  const handleOpenSignoutPopupChange = () => {
    setOpenSignoutPopup(true);
  };
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <section className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6 space-y-6">
      {currentLocation.includes("requested-user-Property-details") ? (
        <h2 className="text-2xl font-bold text-gray-900">Buyer Informations</h2>
      ) : (
        <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
      )}

      <div className="space-y-4">
        <p className="text-gray-800 text-lg">
          <span className="font-semibold text-gray-600">First Name:</span>{" "}
          {userData.firstname}
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold text-gray-600">Last Name:</span>{" "}
          {userData.lastname}
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold text-gray-600">Username:</span>{" "}
          {userData.username}
        </p>
        <p className="text-gray-800 text-lg">
          <span className="font-semibold text-gray-600">Address:</span>{" "}
          {userData.address}
        </p>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <p className="font-semibold text-gray-800 text-lg">Profile Image:</p>
        <img
          src={profileImage}
          alt="Profile"
          className="h-28 w-28 rounded-full border-2 border-gray-200 object-cover"
        />
      </div>
      {currentLocation.includes("requested-user-Property-details") ? (
        ""
      ) : (
        <div className="flex justify-between">
          <Link
            to="/seller-dashboard/edit-details"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-center"
          >
            Edit
          </Link>
          <div className="bg-slate-500 hover:bg-slate-300 px-3 py-3 transition-colors duration-300 rounded-lg shadow-md text-white">
            <Popover
              content={
                <Link
                  onClick={hideSignoutPopup}
                  className="text-white bg-red-500 px-3 py-3 rounded-lg flex justify-center items-center "
                >
                  Yes
                </Link>
              }
              title="Do you want to Signout?"
              trigger="click"
              open={openSignoutPopup}
              onOpenChange={() => handleOpenSignoutPopupChange()}
            >
              <Link className="hover:text-red-700 font-semibold p-4">
                <span>SignOut</span>
                <LoginOutlined className="ml-3" />
              </Link>
            </Popover>
          </div>
        </div>
      )}
    </section>
  );
};

export default AccountCard;
