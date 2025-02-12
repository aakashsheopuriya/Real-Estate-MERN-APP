import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";
import SellerCard from "../../../components/card/SellerCard";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/searchdata/SearchInput";

const BuyerDashboard = () => {
  const [property, setProperty] = useState([]);
  const [loading, setLoading] = useState(false);

  const [allSeller, setAllSeller] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [allProperty, setAllProperty] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();
  const [randomFourProperties, setRandomfourProperties] = useState([]);

  const getRandomItems = (arr, num) => {
    const shuffled = [...arr]?.sort(() => 0.5 - Math.random());
    setRandomfourProperties(shuffled.slice(0, num));
    return shuffled.slice(0, num);
  };

  const getAllProperty = async () => {
    setLoading(true);
    const properties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
    );
    if (properties.data.status) {
      setProperty(properties.data.property.slice(0, 4));
      setAllProperty(properties.data.property);
      getRandomItems(properties.data.property, 4);
      setLoading(false);
    }
  };

  const getAllSellers = async () => {
    const allSeller = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-all-seller`
    );
    setAllSeller(allSeller.data.seller.slice(0, 4));
  };

  const handleclick = async () => {
    if (city) {
      const propertiesByCity = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-property-by-city/${city}`
      );
      if (propertiesByCity) {
        setCityData(propertiesByCity.data.property.slice(0, 4));
      }
    }
  };

  useEffect(() => {
    getAllProperty();
    getAllSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent border-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <section
        className={`bg-[url('./images/house.jpg')] text-white py-20 text-center`}
      >
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Your Dream Home
        </h1>
        <div className="min-w-full flex justify-center items-center">
          <p className="text-justify backdrop-blur-md border border-white/40 rounded-xl p-6  drop-shadow-md italic w-11/12 md:w-3/4 mt-4 text-lg md:text-xl">
            "Finding your dream home starts here! We understand that buying a
            property is one of the most significant decisions you’ll ever make.
            Our dedicated team is here to support you at every step, from
            browsing listings to closing the deal. Explore our wide selection of
            homes tailored to fit your needs and lifestyle. Your dream home
            awaits!"
          </p>
        </div>
      </section>

      {/* Search Box & Filter Section */}
      <section className="bg-slate-200 py-10 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl text-black font-semibold">
              Search Properties
            </h2>
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
              className={`bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 ${
                !city ? `cursor-not-allowed` : ``
              } `}
              onClick={handleclick}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Properties</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isSearch || city ? (
              searchData?.length > 0 ? (
                searchData.map((data, index) => {
                  return <DataCard key={data._id} data={data} />;
                })
              ) : cityData?.length > 0 ? (
                cityData.map((data, index) => {
                  return <DataCard key={data._id} data={data} />;
                })
              ) : (
                <div className="flex w-full justify-center items-center text-xl text-red-500 font-medium">
                  "Did not match any property, try again!"
                </div>
              )
            ) : property?.length > 0 ? (
              randomFourProperties.map((data, index) => {
                return <DataCard key={data._id} data={data} />;
              })
            ) : (
              <div className="flex w-full justify-center items-center text-xl text-red-500 font-medium">
                "No property found ,create first"
              </div>
            )}
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
