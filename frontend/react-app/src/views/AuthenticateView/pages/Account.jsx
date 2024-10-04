import axios from "axios";
import React, { useEffect, useState } from "react";
import AccountCard from "../../../components/card/AccountCard";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
  return <AccountCard profileImage={profileImage} userData={userData} />;
}
