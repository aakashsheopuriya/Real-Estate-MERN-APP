import axios from "axios";
import React, { useState, useEffect } from "react";
import DataCard from "../../../components/card/DataCard";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import SearchInput from "../../../components/searchdata/SearchInput";
import AddButton from "../../../components/buttons/AddButton";

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

  const handleMoreData = async () => {
    alert("fetched seccessfully");
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
    <>
    <div className="m-2 bg-slate-100 h-screen">
      <div className="relative top-11 ">
        <div className="flex justify-between">
          <div className="">
            <BreadCrumbs items={items} />
          </div>
          <SearchInput
            placeholder="input search text"
            style={{
              width: 200,
            }}
            data={property}
          />
        </div>
        <div className="grid grid-cols-4 space-5 gap-2 m-4 p-4 drop-shadow-md ">
          {property.map((data) => {
            return <DataCard data={data} />;
          })}
        </div>
        {/* </div> */}
        <div className="flex justify-center items-center">
          <AddButton
            name="More"
            className="flex justify-center items-center bg-blue-700 text-white p-2 w-20 rounded-xl hover:bg-blue-400"
            onClick={handleMoreData}
          />
        </div>
      </div>
      </div>
    </>
  );
}
