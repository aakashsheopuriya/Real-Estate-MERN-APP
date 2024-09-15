import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";

export default function DataCard({ data }) {
  return (
    <div className="flex justify-center w-full p-4 ">
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
            className="hover:shadow-xl transition-shadow duration-300 ease-in-out font-poppins "
          >
            <div className="flex flex-row items-start">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
                alt="not found"
                className="h-32 w-32 rounded-xl object-cover"
              />

              <div className="ml-4 flex">
                <div className="">
                  <p className="text-gray-800 text-sm font-medium drop-shadow-md break-words ">
                    {data?.propertyDetails}
                  </p>

                  <p className="text-gray-800 font-bold truncate">
                    &#8377;{data?.price}/- INR
                  </p>

                  <p className="text-gray-500 text-sm truncate">
                    <EnvironmentOutlined />
                    {data?.address}
                  </p>
                </div>
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
