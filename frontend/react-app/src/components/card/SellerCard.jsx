import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SellerCard = ({ data }) => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      mirror: false,
    });
  });
  return (
    <div
      data-aos="fade-up"
      data-aos-offset="300"
      key={data}
      className="bg-gray-100 p-4 shadow-md rounded-lg text-center"
    >
      <img
        src={data?.image}
        alt={``}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-bold mb-2">
        {data?.firstname} {data?.lastname}
      </h3>
      <p className="text-gray-600">Top-rated real estate agent</p>
    </div>
  );
};

export default SellerCard;
