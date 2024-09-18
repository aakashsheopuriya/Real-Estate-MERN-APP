import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../../components/card/DataCard";
import SellerCard from "../../../components/card/SellerCard";

const BuyerDashboard = () => {
  const [property, setProperty] = useState([]);
  const [allSeller, setAllSeller] = useState([]);

  const getAllProperty = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
    );
    if (property.data.status) {
      setProperty(property.data.property.slice(0, 4));
    }
  };

  const getAllSellers = async () => {
    const allSeller = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-all-seller`
    );
    setAllSeller(allSeller.data.seller.slice(0, 4));
  };

  useEffect(() => {
    getAllProperty();
    getAllSellers();
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
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Search Properties</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by property name or type"
              className="border border-gray-300 p-3 w-full md:w-1/2 rounded-md"
            />
            {/* Location Filter */}
            <select className="border border-gray-300 p-3 w-full md:w-1/4 rounded-md">
              <option value="">Filter by Location</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
            {/* Search Button */}
            <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
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
            {property?.length > 0
              ? property.map((data, index) => {
                  return <DataCard key={index} data={data} />;
                })
              : "No property found ,create first"}
          </div>
        </div>
      </section>

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
            {[1, 2, 3].map((service) => (
              <div
                key={service}
                className="bg-white p-6 shadow-md rounded-lg text-center"
              >
                <h3 className="text-xl font-bold mb-4">Service {service}</h3>
                <p className="text-gray-600">
                  We provide a comprehensive range of real estate services
                  including buying, selling, and leasing.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyerDashboard;
