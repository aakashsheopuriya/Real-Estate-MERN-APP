import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DataCard({ data }) {
  return (
    <div className="flex justify-center w-full p-4">
      {data ? (
        <Link to={`/dashboard/get-specific-property/${data?._id}`}>
          <Card
            title={data?.title}
            extra="View"
            style={{
              width: "300px",
              height: "240px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden", 
            }}
            className="hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="flex flex-row items-start">
              
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
                alt="not found"
                className="h-32 w-32 object-cover"
              />

              
              <div className="ml-4 flex-1">
              
                <p className="text-gray-600 text-sm  break-words ">
                  {data?.propertyDetails}
                </p>

              
                <p className="text-gray-800 font-bold truncate">
                  {data?.price} INR
                </p>

               
                <p className="text-gray-500 text-sm truncate">
                  {data?.address}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        <p>No Property Found</p>
      )}
    </div>
  );
}
