import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Account() {
  const email = localStorage.getItem("email");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
  });
  const [profileImage, setProfileImage] = useState("");

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setUserData(res.data.user);
    setProfileImage(res.data.user.image);
  };
  useEffect(() => {
    getSpecificUserDetails();
  }, [email]);
  return (
    <section className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto mt-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
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
          src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${profileImage}`}
          alt="Profile"
          className="h-28 w-28 rounded-full border-2 border-gray-200 object-cover"
        />
      </div>

      <Link
        to="/seller-dashboard/edit-details"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-center"
      >
        Edit
      </Link>
    </section>
  );
}
