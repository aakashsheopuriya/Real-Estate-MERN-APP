import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";

export default function Wishlist() {
  const email = localStorage.getItem("email");
  const [property, setProperty] = useState([]);
  const getWishListProperty = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-wishlist/${email}`
    );
    if (res.data.property?.length > 0) {
      setProperty(res.data.property);
    }
  };

  useEffect(() => {
    getWishListProperty();
  }, [email]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {property.length
        ? property?.map((property, index) => {
            return (
              <div key={index} className="flex justify-center">
                <DataCard data={property} />
              </div>
            );
          })
        : ""}
    </div>
  );
}
