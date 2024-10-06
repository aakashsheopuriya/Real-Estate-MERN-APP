import axios from "axios";
import React, { useEffect, useState } from "react";
import RequestedPropertyCard from "../../../components/card/RequestedPropertyCard";

const RequestedProperties = () => {
  const email = localStorage.getItem("email");
  const [RequestedProperty, setRequestedProperty] = useState([]);
  const getRequestedProperties = async () => {
    const RequestedProperties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-requested-properties/${email}`
    );
    if (RequestedProperties) {
      setRequestedProperty(RequestedProperties.data.property);
    }
  };
  useEffect(() => {
    getRequestedProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">
          {RequestedProperty.length !== 0
            ? "Requested Properties"
            : "You don't have any requests"}
        </h1>
        <div className="space-y-4">
          {RequestedProperty.map((property, index) => (
            <RequestedPropertyCard
              key={index}
              property={property}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RequestedProperties;
