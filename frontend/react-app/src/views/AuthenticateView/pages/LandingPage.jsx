import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";
import SellerCard from "../../../components/card/SellerCard";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/searchdata/SearchInput";
import Footer from "../Footer";

const LandingPage = () => {
  const [property, setProperty] = useState([]);
  const [allSeller, setAllSeller] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [allProperty, setAllProperty] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState([]);
  const [randomFourProperties, setRandomfourProperties] = useState([]);

  const navigate = useNavigate();

  const getRandomItems = (arr, num) => {
    const shuffled = [...arr]?.sort(() => 0.5 - Math.random());
    setRandomfourProperties(shuffled.slice(0, num));
    return shuffled.slice(0, num);
  };

  const getAllProperty = async () => {
    const properties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
    );
    if (properties.data.status) {
      setProperty(properties.data.property.slice(0, 4));
      setAllProperty(properties.data.property);
      getRandomItems(properties.data.property, 4);
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
      <div className="bg-slate-50 h-16 flex justify-between items-center w-full sticky top-0 z-20 drop-shadow-lg">
        <div className="flex gap-3 top-3">
          <img
            src={`${process.env.PUBLIC_URL}/HomeLogo.png`}
            alt=""
            className="h-10 rounded-lg"
          />
        </div>
        {/* Welcome Section */}
        <div className=" flex gap-3 top-3 right-3">
          <div>
            <button
              className="bg-slate-200 drop-shadow-lg font-medium text-xl text-black px-5 p-2 rounded-full hover:bg-white transition-all cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:text-blue-400"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
          <div>
            <button
              className="bg-slate-200 drop-shadow-lg font-medium text-xl text-black px-5 p-2 rounded-full hover:bg-white transition-all cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:text-blue-400"
              onClick={() => {
                navigate("/Signup-Now");
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Your Dream Home
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Find the perfect property that fits your needs
        </p>
      </section>

      {/* hero section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>

          {/* Seller Section */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div className="md:w-1/2">
              <img
                src="https://via.placeholder.com/400x300?text=For+Sellers"
                alt="Services for Sellers"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Sellers
              </h3>
              <p className="mt-4 text-gray-600">
                We offer expert guidance to help you sell your property quickly
                and at the best price. Our services include home staging,
                marketing strategies, and negotiations.
              </p>
            </div>
          </div>

          {/* Buyer Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                For Buyers
              </h3>
              <p className="mt-4 text-gray-600">
                Our team helps you find the perfect home that fits your needs
                and budget. We provide market analysis, property tours, and
                negotiation support.
              </p>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://via.placeholder.com/400x300?text=For+Buyers"
                alt="Services for Buyers"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

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
            {cityData?.length > 0 ? (
              cityData.map((data, index) => {
                return <DataCard key={data._id} data={data} />;
              })
            ) : isSearch ? (
              searchData?.length > 0 ? (
                searchData.map((data, index) => {
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
            navigate("/login");
          }}
        >
          Please Login to view more properties
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
      <Footer />
    </div>
  );
};

export default LandingPage;
