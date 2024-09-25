import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../components/card/DataCard";
import { useNavigate } from "react-router-dom";
import RequestedPropertyCard from "../../components/card/RequestedPropertyCard";

export default function UserDashboard() {
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({});
  const [property, setProperty] = useState([]);
  const [RequestedProperty, setRequestedProperty] = useState([]);
  const [randomFourProperties, setRandomfourProperties] = useState([]);
  const navigate = useNavigate();

  const getRandomItems = (arr, num) => {
    const shuffled = [...arr]?.sort(() => 0.5 - Math.random());
    setRandomfourProperties(shuffled.slice(0, num));
    return shuffled.slice(0, num);
  };

  const getRequestedProperties = async () => {
    const RequestedProperties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-requested-properties/${email}`
    );
    if (RequestedProperties) {
      setRequestedProperty(RequestedProperties.data.property);
    }
  };

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setUser(res.data.user);
  };

  const getPropertiesById = async () => {
    const properties = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-property/${email}`
    );
    if (properties.data.status) {
      setProperty(properties.data.property);
      getRandomItems(properties.data.property, 4);
    }
  };

  const seller = {
    reviews: [
      {
        user: "Lakhan Tailor",
        comment: "Great experience! Good Price",
        rating: 5,
      },
      { user: "Pravleen Kaur", comment: "Very professional!", rating: 4 },
    ],
    facilities: [
      "Swimming Pool",
      "Gym/Fitness Centers",
      "Parking Spaces (dedicated or shared)",
      "Water Supply (24/7 or specified hours)",
      "24/7 Security (CCTV surveillance, security guards",
      "Playgrounds and Parks (children’s play areas)",
      "Shopping Complex/Stores nearby or within the complex",
      "Healthcare Facilities (clinics, pharmacy within the complex)",
      "High-Speed Internet Connectivity",
    ],
  };

  useEffect(() => {
    getSpecificUserDetails();
    getPropertiesById();
    getRequestedProperties();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">
          Welcome, {user.firstname} {user.lastname}!
        </h1>
        <p className="mt-4 text-xl">
          Manage your properties and view your performance.
        </p>
      </section>

      {/* Properties Section */}
      <section className="py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center items-center">
          {property?.length > 0
            ? randomFourProperties.map((data, index) => {
                return <DataCard key={index} data={data} />;
              })
            : "No property found ,create first"}
        </div>
      </section>

      <div className="flex justify-center mb-4">
        <button
          className={`bg-blue-700 text-white p-3 rounded-xl hover:bg-blue-500 transition-all cursor-pointer`}
          onClick={() => {
            navigate("/seller-dashboard/my-property");
          }}
        >
          View all properties
        </button>
      </div>

      {/* Wishlisted Properties Section */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6">Requested Properties</h2>
        <div className="container mx-auto p-4">
          <div className="space-y-4">
            {RequestedProperty.map((property, index) => (
              <RequestedPropertyCard
                key={property.title}
                property={property}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold mb-6">Facilities Provided</h2>
        <ul className="list-disc pl-6">
          {seller.facilities.map((facility, index) => (
            <li key={index} className="text-gray-600 mb-2">
              {facility}
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews Section */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6">User Reviews</h2>
        <div className="space-y-4">
          {seller.reviews.map((review, index) => (
            <div key={index} className="bg-white shadow-md p-6 rounded-lg">
              <h4 className="text-xl font-semibold">{review.user}</h4>
              <p className="text-gray-600">Rating: {review.rating} / 5</p>
              <p className="text-gray-600 mt-2">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
