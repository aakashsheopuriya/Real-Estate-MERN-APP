import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";
import SellerCard from "../../../components/card/SellerCard";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../../components/searchdata/SearchInput";
import Footer from "../Footer";
import AOS from "aos";
import "aos/dist/aos.css";

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

  const email = localStorage.getItem("email");
  const getAllProperty = async () => {
    if (email) {
      navigate("/login");
    }
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
    setRandomfourProperties([]);
    setIsSearch(false);
    if (!city) {
    } else {
      const propertiesByCity = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-property-by-city/${city}`
      );
      setCityData(propertiesByCity.data.property.slice(0, 4));
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,
      mirror: false,
    });
    getAllProperty();
    getAllSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSearch]);

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
    <div className=" min-h-screen bg-gray-50">
      <div className="bg-slate-50 h-16 flex justify-between items-center w-full sticky top-0 z-20 drop-shadow-sm">
        <div className="flex gap-3 top-3">
          <img
            src={`${process.env.PUBLIC_URL}/HomeLogo.png`}
            alt=""
            className="h-10 rounded-lg"
          />
        </div>
        <div className=" flex gap-3 top-3 right-3">
          <div>
            <button
              className="bg-slate-200 drop-shadow-lg font-medium text-black px-5 p-2 rounded-full hover:bg-white transition-all cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:text-blue-400"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
          <div>
            <button
              className="bg-slate-200 drop-shadow-lg font-medium text-black px-5 p-2 rounded-full hover:bg-white transition-all cursor-pointer hover:scale-105 hover:drop-shadow-2xl hover:text-blue-400"
              onClick={() => {
                navigate("/Signup-Now");
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Section */}

      <section className="bg-[url('./images/house.jpg')] text-white py-20  text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Your Dream Home
        </h1>
        <div className="min-w-full flex justify-center items-center">
          <p className="text-justify backdrop-blur-md border border-white/40 rounded-xl p-6  drop-shadow-md italic w-11/12 md:w-3/4 mt-4 text-lg md:text-xl">
            "Your trusted partner in real estate. We are committed to providing
            exceptional service, whether you are looking to buy, sell, or invest
            in property. With our expertise and market knowledge, we’ll help you
            navigate the real estate landscape to find the perfect home or
            investment. Start your journey with us today!"
          </p>
        </div>
      </section>

      {/* hero section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>

          {/* Seller Section */}
          <div className="flex flex-col md:flex-row items-center mb-16">
            <div data-aos="fade-right"  data-aos-mirror="true" className="md:w-1/2">
              <img
                src={process.env.PUBLIC_URL + "/seller1.jpg"}
                alt="Services for Sellers"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
            <div className="w-full mt-4 md:w-1/2 md:pl-8">
              <h3 className="text-center md:text-start text-2xl text-blue-500 font-bold">
                For Sellers
              </h3>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>
                  <span className="text-lg font-medium text-black">
                    Property Promotion:{" "}
                  </span>
                  <br />
                  Featured listings on our website and social media for maximum
                  visibility.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Professional Photography:{" "}
                  </span>
                  <br />
                  High-quality visuals to showcase your property.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Dedicated Seller Support:{" "}
                  </span>
                  <br />
                  Expert assistance in pricing, timing, and negotiations.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Property Valuation:{" "}
                  </span>
                  <br />
                  Free expert valuations to determine market value.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Legal Assistance:{" "}
                  </span>
                  <br />
                  Support with documentation and contracts for a hassle-free
                  process.
                </li>
              </ul>
            </div>
          </div>

          {/* Buyer Section */}
          <div className="flex flex-col-reverse md:flex-row items-center">
            <div className="w-full mt-4 md:w-1/2">
              <h3 className="text-center md:text-start text-2xl text-blue-500 font-bold">
                For Buyers
              </h3>
              <ul className="mt-4 text-gray-600 space-y-2 leading-tight">
                <li>
                  <span className="text-lg font-medium text-black">
                    Wide Property Range:{" "}
                  </span>
                  <br />
                  Extensive listings for residential, commercial, and investment
                  properties.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Detailed Listings:{" "}
                  </span>
                  <br />
                  Comprehensive property details, high-quality images, and
                  virtual tours.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Expert Guidance:{" "}
                  </span>
                  <br />
                  Professional agents to assist you throughout the buying
                  process.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Verified Properties:{" "}
                  </span>
                  <br />
                  Thoroughly verified listings for legal and transactional
                  transparency.
                </li>
                <li>
                  <span className="text-lg font-medium text-black">
                    Neighborhood Insights:{" "}
                  </span>
                  <br />
                  Insights into local amenities, schools, and lifestyle.
                </li>
              </ul>
            </div>
            <div data-aos="fade-left" className="md:w-1/2 ml-3">
              <img
                src={process.env.PUBLIC_URL + "/buyer1.jpg"}
                alt="Services for Buyers"
                className="rounded-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Box & Filter Section */}
      <section className="py-10 bg-gray-200">
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
              className={`bg-blue-600 text-white p-3 rounded-md ${
                city ? "" : "opacity-50 cursor-not-allowed"
              } hover:bg-blue-700`}
              onClick={handleclick}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      {/* <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Properties</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isSearch ? (
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
      </section> */}
      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Properties</h2>
          </div>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
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
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {/* Example Seller Card */}
            {allSeller?.length > 0
              ? allSeller.map((data, index) => {
                  return <SellerCard key={index} data={data} />;
                })
              : "No property found ,create first"}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Services We Provide</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Buyer Facilities */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Wide Property Range</h3>
              <p className="text-gray-600">
                Extensive listings for residential, commercial, and investment
                properties.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Detailed Listings</h3>
              <p className="text-gray-600">
                Comprehensive details, high-quality images, and virtual tours
                for each property.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
              <p className="text-gray-600">
                Professional agents to assist you throughout the buying process.
              </p>
            </div>

            {/* Seller Facilities */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Property Promotion</h3>
              <p className="text-gray-600">
                Featured listings on our website and social media for maximum
                visibility.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">
                Professional Photography
              </h3>
              <p className="text-gray-600">
                High-quality visuals and virtual tours to showcase your property
                effectively.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">
                Dedicated Seller Support
              </h3>
              <p className="text-gray-600">
                Expert assistance in pricing, timing, and negotiations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">User Reviews</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Buyer Reviews */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Buyer Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
              <p className="text-gray-600">
                "I had a great experience finding my dream home! The agents were
                helpful and knowledgeable."
              </p>
              <p className="text-gray-500 italic mt-2">- John Doe</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Buyer Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
              </div>
              <p className="text-gray-600">
                "Excellent service! They guided me through the entire process
                smoothly."
              </p>
              <p className="text-gray-500 italic mt-2">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Buyer Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
              <p className="text-gray-600">
                "Very professional and attentive. I felt supported every step of
                the way."
              </p>
              <p className="text-gray-500 italic mt-2">- Emily Johnson</p>
            </div>

            {/* Seller Reviews */}
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Seller Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
              <p className="text-gray-600">
                "Sold my property in no time! Their marketing strategy worked
                wonders."
              </p>
              <p className="text-gray-500 italic mt-2">- Michael Brown</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Seller Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ☆</span>
              </div>
              <p className="text-gray-600">
                "Fantastic experience! The team handled everything
                professionally."
              </p>
              <p className="text-gray-500 italic mt-2">- Sarah Wilson</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Seller Review</h3>
              <div className="flex justify-center mb-2">
                <span className="text-yellow-500">★ ★ ★ ★ ★</span>
              </div>
              <p className="text-gray-600">
                "I appreciated their support and expertise throughout the
                selling process."
              </p>
              <p className="text-gray-500 italic mt-2">- David Lee</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
