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

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setUserData(res.data.user);
  };
  useEffect(() => {
    getSpecificUserDetails();
  }, [email]);
  return (
    <section className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">First Name:</span> {userData.firstname}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Last Name:</span> {userData.lastname}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-medium">Username:</span> {userData.username}
      </p>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Address:</span> {userData.address}
      </p>

      <Link
        to="/dashboard/edit-details"
        className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors duration-300 text-center"
      >
        Edit
      </Link>
    </section>
  );
}
