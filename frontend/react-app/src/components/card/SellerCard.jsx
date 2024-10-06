import React from "react";

const SellerCard = ({ data }) => {
  return (
    <div
      key={data}
      className="bg-gray-100 p-4 shadow-md rounded-lg text-center"
    >
      <img
        src={data?.image}
        alt={``}
        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
      />
      <h3 className="text-lg font-bold mb-2">
        {data?.firstname}  {data?.lastname}
      </h3>
      <p className="text-gray-600">Top-rated real estate agent</p>
    </div>
  );
};

export default SellerCard;
