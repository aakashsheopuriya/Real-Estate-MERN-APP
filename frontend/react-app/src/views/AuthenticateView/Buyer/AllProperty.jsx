import axios from "axios";
import React, { useState, useEffect } from "react";
import DataCard from "../../../components/card/DataCard";
import BreadCrumbs from "../../../components/breadcrumbs/BreadCrumbs";
import SearchInput from "../../../components/searchdata/SearchInput";
import AddButton from "../../../components/buttons/AddButton";

export default function AllProperty() {
  const [property, setProperty] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [item, setItem] = useState(8);
  const [page, setPage] = useState(1);
  const [totalProperty, setTotalProperty] = useState(1);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const getAllProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
    );
    if (property.data.status) {
      setTotalProperty(property.data.property);
      setProperty(property.data.property.slice(0, item * page));
    }
  };

  const handleMoreData = async () => {
    setPage(page + 1);
  };
  useEffect(() => {
    getAllProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, item]);
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
            <div className="fixed top-18 right-10 z-10">
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

          <div className="flex justify-center items-center p-3">
            {isSearch
              ? searchData.length > item * page && (
                  <AddButton
                    name="More"
                    className="flex justify-center items-center bg-blue-700 text-white p-2 w-20 rounded-xl hover:bg-blue-400"
                    onClick={handleMoreData}
                  />
                )
              : totalProperty.length > item * page && (
                  <AddButton
                    name="More"
                    className="flex justify-center items-center bg-blue-700 text-white p-2 w-20 rounded-xl hover:bg-blue-400"
                    onClick={handleMoreData}
                  />
                )}
          </div>
        </div>
      </div>
    </>
  );
}
