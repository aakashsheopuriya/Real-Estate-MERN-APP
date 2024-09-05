import { Card } from "antd";
import React from "react";

export default function DataCard({data}) {
    console.log("data in DataCard",data);
  return (
    <div className="cursor-pointer">
      {" "}
      <Card
        title={data.title}
        extra={<a href="#">View</a>}
        style={{
          width: 300,
        }}
      >\
      <img src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data.image}`} alt="not found" width={100} height={100}></img>
        <p>{data.propertyDetails}</p>
        <p>{data.price} (in INR)</p>
        <p>{data.address}</p>
      </Card>
    </div>
  );
}
