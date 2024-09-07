import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  console.log("id", id);
  const [property, setProperty] = useState({});
  const getSpecificPropertyDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/common/api/get-property/${id}`
    );
    console.log("backend res", res);
    setProperty(res.data.property);
  };
  const navigate=useNavigate();
  const handleBack=async ()=>{
       navigate(-1);
  }

  useEffect(() => {
    getSpecificPropertyDetails();
  }, []);
  return (
    <div className="">
      <div>
        property details
        <div className="">{/* <BreadCrumbs items={items} /> */}</div>
        <div>
          <h1>{property.title}</h1>
          <h1>{property.propertyDetails}</h1>
          <h1>{property.price}</h1>
          <h1>{property.address}</h1>
          <h1>{property.status}</h1>
        </div>
      </div>
      <div>
      <button onClick={handleBack} className="bg-blue-700 text-white p-2 w-20 rounded-xl hover:bg-blue-400">
        Back
      </button>
      </div>
    </div>
  );
}
