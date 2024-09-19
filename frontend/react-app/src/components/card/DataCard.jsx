import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";

export default function DataCard({ data }) {
  const role = localStorage.getItem("role");
  return (
    // <div className="flex justify-center w-full p-4 ">
    //   {data ? (
    //     <Link to={role==="seller"?`/seller-dashboard/get-specific-property/${data?._id}`:`/buyer-dashboard/specific/get-specific-property/${data?._id}`}>
    //       <Card
    //         title={data?.title}
    //         extra="View"
    //         style={{
    //           width: "300px",
    //           height: "240px",
    //           display: "flex",
    //           flexDirection: "column",
    //           justifyContent: "space-between",
    //           overflow: "hidden",
    //         }}
    //         className="hover:shadow-xl transition-shadow duration-300 ease-in-out font-poppins "
    //       >
    //         <div className="flex flex-row items-start">
    //           <img
    //             src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
    //             alt="not found"
    //             className="h-32 w-32 rounded-xl object-cover"
    //           />

    //           <div className="ml-4 flex">
    //             <div className="">
    //               <p className="text-gray-800 text-sm font-medium drop-shadow-md break-words ">
    //                 {data?.propertyDetails}
    //               </p>

    //               <p className="text-gray-800 font-bold truncate">
    //                 &#8377;{data?.price}/- INR
    //               </p>

    //               <p className="text-gray-500 text-sm truncate">
    //                 <EnvironmentOutlined />
    //                 {data?.address}
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </Card>
    //     </Link>
    //   ) : (
    //     <p>No Property Found</p>
    //   )}
    // </div>

    <>
      {/* <div className="flex justify-center w-full p-4 ">
        {data ? (
          <div className="bg-white p-4 shadow-md rounded-lg">
            <Link to={role==="seller"?`/seller-dashboard/get-specific-property/${data?._id}`:`/buyer-dashboard/specific/get-specific-property/${data?._id}`}>
            <img
              style={{
                width: "300px",
                height: "240px",
              }}
              src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
              alt={""}
              className="w-full h-48 object-cover rounded-md mb-4"
            /></Link>
            <h3 className="text-lg font-bold mb-2">{data?.title}</h3>
            <p className="text-gray-600"><EnvironmentOutlined />Location: {data?.address}</p>
            <p className="text-blue-600 mt-2 font-semibold">&#8377;{data?.price}/- INR</p>
          </div>
        ) : (
          <p>No Property Found</p>
        )}
      </div> */}
      {/* <div className="flex justify-center w-full p-4">
        {data ? (
          <div className="bg-white p-4 shadow-md rounded-lg">
            <Link
              to={
                role === "seller"
                  ? `/seller-dashboard/get-specific-property/${data?._id}`
                  : `/buyer-dashboard/specific/get-specific-property/${data?._id}`
              }
            >
              <div className="overflow-hidden rounded-md mb-4">
                <img
                  style={{
                    width: "300px",
                    height: "240px",
                  }}
                  src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
                  alt=""
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <h3 className="text-lg font-bold mb-2">{data?.title}</h3>
            <p className="text-gray-600">
              <EnvironmentOutlined /> Location: {data?.address}
            </p>
            <p className="text-blue-600 mt-2 font-semibold">
              &#8377;{data?.price}/- INR
            </p>
          </div>
        ) : (
          <p>No Property Found</p>
        )}
      </div> */}
      <div className="flex justify-center w-full p-4 cursor-pointer">
        {data ? (
          <div className="bg-white p-4 shadow-md rounded-lg transform transition-transform duration-300 hover:shadow-2xl hover:text-blue-500">
            <Link
              to={
                role === "seller"
                  ? `/seller-dashboard/get-specific-property/${data?._id}`
                  : `/buyer-dashboard/specific/get-specific-property/${data?._id}`
              }
            >
              <div className="overflow-hidden rounded-md mb-4">
                <img
                  style={{
                    width: "300px",
                    height: "240px",
                  }}
                  src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
                  alt=""
                  className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105"
                />
              </div>
            </Link>
            <h3 className="text-lg font-bold mb-2">{data?.title}</h3>
            <p className="text-gray-600">
              <EnvironmentOutlined /> Location: {data?.address}
            </p>
            <p className="text-blue-600 mt-2 font-semibold">
              &#8377;{data?.price}/- INR
            </p>
          </div>
        ) : (
          <p>No Property Found</p>
        )}
      </div>
    </>
  );
}
