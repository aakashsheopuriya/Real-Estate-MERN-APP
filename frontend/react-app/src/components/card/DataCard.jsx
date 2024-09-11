import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DataCard({ data }) {
  console.log("data in DataCard", data);
  return (
    <div className=" flex cursor-pointer w-[250] justify-center">
      {data ? (
        <Link to={`/dashboard/get-specific-property/${data?._id}`}>
          {" "}
          <Card
            title={data?.title}
            extra={<a href="#">View</a>}
            style={{
              width: 250,
              height: 250,
            }}
          >
            <div className="flex ">
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`}
                alt="not found"
                className="h-32 w-32 hover:drop-shadow-2xl"
              ></img>{" "}
              <div className="flex ">
                <div className="p-2 pl-4">
                  <p>{data?.propertyDetails}</p>
                  <p>{data?.price} (in INR)</p>
                  <p>{data?.address}</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ) : (
        "no Property found"
      )}
    </div>
  );
}
