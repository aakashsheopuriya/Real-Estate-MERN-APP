import React from "react";
import {Card} from "antd";

export default function RenderData({data,price}) {
    console.log("props",data,price);
  return (
    <div>
      RenderData
      <ul>
        {data.map((fruit, i) => {
          return <Card
          title="Default size card"
          extra={<a href="#">More</a>}
          style={{
            width: 300,
          }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        })}
      </ul>
    </div>
  );
}
