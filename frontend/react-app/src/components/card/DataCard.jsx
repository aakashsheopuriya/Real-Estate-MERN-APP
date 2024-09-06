import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export default function DataCard({data}) {
    console.log("data in DataCard",data);
  return (
    <div className="cursor-pointer ">
     <Link to="/get-specific-property">
     {" "}
      <Card 
        title={data.title}
        extra={<a href="#">View</a>}
        style={{
          width: 300,
        }}
      >
      <img src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`} alt="not found"  className="h-40 w-40 hover:h-44 hover:w-44 hover:drop-shadow-2xl" ></img>
        <p>{data.propertyDetails}</p>
        <p>{data.price} (in INR)</p>
        <p>{data.address}</p>
      </Card>
     </Link>
    </div>
  );
}
