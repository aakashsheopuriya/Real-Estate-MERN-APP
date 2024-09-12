import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Account() {
  const email=localStorage.getItem("email");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    address: "",
  });

  const getSpecificUserDetails = async ()=>{
        const res=await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`);
        console.log("res",res);
        setUserData(res.data.user);
  }
  useEffect(()=>{
         getSpecificUserDetails();
  },[email]);
  return (
    <div>
      Basic Information
      <h1>First name : {userData.firstname}</h1>
      <h1>Last name : {userData.lastname}</h1>
      <h1>Username : {userData.username}</h1>
      <h1>Address : {userData.address}</h1>
    </div>
  );
}
