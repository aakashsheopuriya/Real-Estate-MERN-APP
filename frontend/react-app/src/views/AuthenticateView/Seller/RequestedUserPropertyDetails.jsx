import { useEffect, useState } from "react";
// import Account from "../pages/Account";
import SinglePropertyPage from "./SinglePropertyPage";
import axios from "axios";
import { useParams } from "react-router-dom";
import AccountCard from "../../../components/card/AccountCard";
import { Skeleton } from "antd";

const RequestedUserPropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [userData, setUserData] = useState({});
  const [loader, setLoader] = useState(false);

  const getSpecificPropertyDetails = async () => {
    setLoader(true);
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/requested-user-Property-details/${id}`
    );
    if (res?.data?.property) {
      const responseProperty = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${res.data.property[0].propertyId}`
      );
      setProperty(responseProperty?.data?.property);
      if (responseProperty.data.property) {
        const responseUser = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/user/api/requested/user/${res.data.property[0].buyerId}`
        );
        setUserData(responseUser?.data?.user);
        setLoader(false);
      }
    }
  };
  useEffect(() => {
    getSpecificPropertyDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {loader ? (
        <Skeleton active />
      ) : (
        <div className="flex-row justify-centers items-center ">
          <div className="mb-10">
            <AccountCard userData={userData} profileImage={userData.image} />
          </div>
          <div className="mb-10">
            <h1 className="text-center text-2xl font-bold text-gray-900">Requested Poperty Details</h1>
            <SinglePropertyPage data={property} />
          </div>
        </div>
      )}
    </>
  );
};

export default RequestedUserPropertyDetails;
