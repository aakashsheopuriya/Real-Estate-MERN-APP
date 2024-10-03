import React from "react";

const SinglePropertyPage = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${data?.image}`}
          alt="Property"
          className="w-[420px] h-[420px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Details Section */}
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{data?.title}</h2>
          <p className="text-gray-600 mb-4">{data?.propertyDetails}</p>

          <h3 className="text-lg font-semibold">Services</h3>
          <p className="text-gray-600 mb-4">
            {data?.services?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </p>

          <h3 className="text-lg font-semibold">Address</h3>
          <p className="text-gray-600 mb-4">{data?.address}</p>

          <h3 className="text-lg font-semibold">Price</h3>
          <p className="text-gray-600 mb-4">{data?.price} (in INR)</p>

          <h3 className="text-lg font-semibold">Contact Number</h3>
          <p className="text-gray-600 mb-4"> +91 {data?.contactNumber}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyPage;
