import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";
import SellerCard from "../../../components/card/SellerCard";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/searchdata/SearchInput";

const BuyerDashboard = () => {
  const [property, setProperty] = useState([]);
  const [allSeller, setAllSeller] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [allProperty, setAllProperty] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();

  const getAllProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
    );
    if (property.data.status) {
      setProperty(property.data.property.slice(0, 4));
      setAllProperty(property.data.property);
    }
  };

  const getAllSellers = async () => {
    const allSeller = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-all-seller`
    );
    setAllSeller(allSeller.data.seller.slice(0, 4));
  };

  const handleclick = async () => {
    const propertiesByCity = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-property-by-city/${city}`
    );
    setCityData(propertiesByCity.data.property);
  };

  useEffect(() => {
    getAllProperty();
    getAllSellers();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Your Dream Home
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Find the perfect property that fits your needs
        </p>
      </section>

      {/* Search Box & Filter Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Search Properties</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Search Input */}
            <SearchInput
              className="border border-gray-300 flex-1  w-full md:w-1/2  rounded-md"
              placeholder="input search text"
              style={{
                width: "100%",
                height: 50,
                minWidth: isLargeScreen ? "500px" : "100%",
              }}
              data={allProperty}
              getSearchData={setSearchData}
              isSearch={setIsSearch}
            />
            {/* <input
              type="text"
              placeholder="Search by property name or type"
              className="border border-gray-300 p-3 w-full md:w-1/2 rounded-md"
            /> */}
            {/* Location Filter */}
            <select
              className="border border-gray-300 p-3 w-full md:w-1/4 rounded-md"
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Filter by Location</option>
              <option value="indore">Indore</option>
              <option value="dewas">Dewas</option>
              <option value="bhopal">Bhopal</option>
            </select>
            {/* Search Button */}
            <button
              className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
              onClick={handleclick}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Properties</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example Property Card */}
            {cityData?.length > 0
              ? cityData.map((data, index) => {
                  return <DataCard key={data._id} data={data} />;
                })
              : isSearch
              ? searchData?.length > 0
                ? searchData.map((data, index) => {
                    return <DataCard key={data._id} data={data} />;
                  })
                : "no property"
              : property?.length > 0
              ? property.map((data, index) => {
                  return <DataCard key={data._id} data={data} />;
                })
              : "No property found ,create first"}
            {/* {property?.length > 0
              ? property.map((data, index) => {
                  return <DataCard key={index} data={data} />;
                })
              : "No property found ,create first"} */}
          </div>
        </div>
      </section>

      <div className="flex justify-center  bg-gray-100 mb-4">
        <button
          className={`bg-blue-700 text-white p-3 rounded-xl hover:bg-blue-500 transition-all cursor-pointer`}
          onClick={() => {
            navigate("/buyer-dashboard/all-property");
          }}
        >
          View all properties
        </button>
      </div>

      {/* Featured Sellers Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Our Best Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example Seller Card */}
            {allSeller?.length > 0
              ? allSeller.map((data, index) => {
                  return <SellerCard key={index} data={data} />;
                })
              : "No property found ,create first"}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Services We Provide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Service Card */}

            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Parking</h3>
              <p className="text-gray-600">
                Two wheeler and four wheeler parking space available in
                residance.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Park</h3>
              <p className="text-gray-600">
                Play ground for kids , walkways for walkind & running, badminton
                court.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Shops </h3>
              <p className="text-gray-600">
                Important Shops like medical, groseries,nearby Shopping mall
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
