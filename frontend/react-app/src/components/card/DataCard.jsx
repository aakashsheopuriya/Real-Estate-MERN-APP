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
      >
        <p>{data.propertyDetails}</p>
        <p>{data.price} (in INR)</p>
        <p>{data.address}</p>
      </Card>
    </div>
  );
}
