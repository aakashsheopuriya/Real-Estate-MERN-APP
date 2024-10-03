import React from "react";
import { Link } from "react-router-dom";

const RequestedPropertyCard = ({ property, index }) => {
  return (
    <>
      {/* <Link
        to={`/seller-dashboard/requested-user-Property-details/${property?._id}`}
      > */}
      <div
        key={property.id}
        className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden md:h-32"
      >
        {/* Property Number */}
        <div className="bg-blue-600 text-white flex items-center justify-center w-14 h-14 md:h-auto">
          <span className="text-lg font-bold">{index + 1}</span>
        </div>

        {/* Property Details */}
        <div className="flex flex-col md:flex-row flex-grow p-3">
          {/* Buyer and Property Info */}
          <div className="flex-grow md:pr-3">
            <p className="text-gray-700 font-semibold mb-1">
              Buyer Name: {property.firstname} {property.lastname}
            </p>
            <h2 className="text-lg font-bold text-blue-700 mb-1">
              {property.title}
            </h2>
            <p className="text-gray-600 text-base">
              Price: &#8377;{property?.price}/- INR
            </p>
          </div>

          {/* Property Image */}
          <div className="w-full md:w-40 h-40">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${property.image}`}
              alt={property.title}
              className="object-cover w-full h-[105px] rounded-lg hover:scale-105"
            />
          </div>
        </div>
      </div>
      {/* </Link> */}
    </>
  );
};

export default RequestedPropertyCard;
