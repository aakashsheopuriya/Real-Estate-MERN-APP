import axios from "axios";
import React, { useEffect } from "react";

const BuyerDashboard = () => {
  const getAllProperty = async () => {
  const property = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/buyer/api/get-all-property`
  );
  if (property.data.status) {
    console.log(property)
  }
};

useEffect(()=>{
  getAllProperty()
},[])
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
            {[1, 2, 3, 4].map((property) => (
              <div key={property} className="bg-white p-4 shadow-md rounded-lg">
                <img
                  src={`https://via.placeholder.com/300?text=Property+${property}`}
                  alt={`Property ${property}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-2">
                  Beautiful Apartment {property}
                </h3>
                <p className="text-gray-600">Location: New York City</p>
                <p className="text-blue-600 mt-2 font-semibold">$500,000</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sellers Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">Featured Sellers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Example Seller Card */}
            {[1, 2, 3].map((seller) => (
              <div
                key={seller}
                className="bg-gray-100 p-4 shadow-md rounded-lg text-center"
              >
                <img
                  src={`https://via.placeholder.com/150?text=Seller+${seller}`}
                  alt={`Seller ${seller}`}
                  className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold mb-2">Seller {seller}</h3>
                <p className="text-gray-600">Top-rated real estate agent</p>
              </div>
            ))}
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
