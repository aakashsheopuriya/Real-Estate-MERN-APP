import { useEffect, useState } from "react";
import Account from "../pages/Account";
import SinglePropertyPage from "./SinglePropertyPage";
import axios from "axios";
import { useParams } from "react-router-dom";

const RequestedUserPropertyDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [property, setProperty] = useState();

  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    console.log(res);
    if (res.data.property) {
      setProperty(res.data.property);
      //   setPropertyId(res.data.property._id);
      //   setPropertyStatus(res.data.property.status);
      //   setSellerId(res.data.property.sellerId);
      //   setPropertyTitle(res.data.property.title);
      //   setPropertyImage(res.data.property.image);
      //   setPropertyPrice(res.data.property.price);
    } else {
      //   navigate("/dashboard/my-property");
      //   setProperty([]);
    }
  };
  useEffect(() => {
    getSpecificPropertyDetails();
  }, []);
  return (
    <>
      <div>
        <Account />
      </div>
      <div>
        <SinglePropertyPage data={property} />
      </div>
    </>
  );
};

export default RequestedUserPropertyDetails;
