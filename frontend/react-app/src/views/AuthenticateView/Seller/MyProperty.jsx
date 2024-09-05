import axios from "axios";
import React, { useState, useEffect } from "react";
import DataCard from "../../../components/card/DataCard";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";

export default function MyProperty() {
  const [property, setProperty] = useState([]);
  const id = "durgesh2@gmail.com";
  const getSpecificProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-property/${id}`
    );
    console.log("property from backend", property);
    if (property.data.status) {
      setProperty(property.data.property);
    }
  };
  useEffect(() => {
    getSpecificProperty();
  }, []);
  const items = [
    { title: "home" },
    {
      title: "my property",
    },
  ];
  return (
    <div className="relative top-11 bg-slate-100 h-screen">
      <div className="">
        <BreadCrumbs items={items} />
      </div>
      <div className="flex justify-center "></div>
      <div className="grid grid-cols-4 space-5 gap-2 m-4 p-4">
        {property.map((data) => {
          return <DataCard data={data} />;
        })}
      </div>
      {/* </div> */}
    </div>
  );
}
