import axios from "axios";
import React, { useState, useEffect } from "react";
import DataCard from "../../../components/card/DataCard";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import SearchInput from "../../../components/searchdata/SearchInput";
// import AddButton from "../../../components/buttons/AddButton";

export default function MyProperty() {
  const [property, setProperty] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const id = localStorage.getItem("email");
  const getSpecificProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-property/${id}`
    );
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
    <>
      <div className="m-2 bg-slate-100">
        <div className=" ">
          <div className="flex justify-between pb-3 pr-2">
            <div className="">
              <BreadCrumbs items={items} />
            </div>
            <div className="fixed top-14 right-10 z-10">
              <SearchInput
                placeholder="input search text"
                style={{
                  width: 200,
                }}
                data={property}
                getSearchData={setSearchData}
                isSearch={setIsSearch}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
            {searchData?.length > 0
                ? searchData.map((data, index) => {
                    return <DataCard key={index} data={data} />;
                  })
                : isSearch
                ? "property no found"
                : property?.length > 0
                ? property.map((data, index) => {
                    return <DataCard key={index} data={data} />;
                  })
                : "No property found ,create first"}
            </div>
          </div>

          {/* </div> */}
          <div className="flex justify-center items-center p-3">
            {/* <AddButton
            name="More"
            className="flex justify-center items-center bg-blue-700 text-white p-2 w-20 rounded-xl hover:bg-blue-400"
            onClick={handleMoreData}
          /> */}
          </div>
        </div>
      </div>
    </>
  );
}
