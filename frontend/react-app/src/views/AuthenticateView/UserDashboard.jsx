import axios from "axios";
import React, { useEffect, useState } from "react";
import DataCard from "../../components/card/DataCard";

export default function UserDashboard() {
  const email = localStorage.getItem("email");
  const [user, setUser] = useState({});
  const [property, setProperty] = useState([]);
  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    console.log(res);
    setUser(res.data.user);
  };

  const getPropertiesById = async () => {
    const property = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/seller/api/get-property/${email}`
    );
    if (property.data.status) {
      setProperty(property.data.property);
    }
  };

  console.log("properties", property);

  const seller = {
    properties: [
      {
        id: 1,
        name: "Luxury Apartment",
        location: "Downtown",
        price: "$200,000",
      },
      { id: 2, name: "Cozy Villa", location: "Uptown", price: "$350,000" },
    ],
    wishlistedProperties: [
      { id: 1, name: "Luxury Apartment", location: "Downtown", wishlists: 45 },
    ],
    reviews: [
      { user: "Alice", comment: "Great experience!", rating: 5 },
      { user: "Bob", comment: "Very professional!", rating: 4 },
    ],
    facilities: ["Swimming Pool", "Gym", "Parking", "Garden"],
  };

  useEffect(() => {
    getSpecificUserDetails();
    getPropertiesById();
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
          {property?.length>0?property.map((data ,index) => {
            return <DataCard key={index} data={data} />;
          }):"No property found ,create first"}
        </div>
      </section>

      {/* Wishlisted Properties Section */}
      <section className="py-12 px-6 bg-gray-200">
        <h2 className="text-3xl font-semibold mb-6">Wishlisted Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {seller.wishlistedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-md p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-gray-600">Location: {property.location}</p>
              <p className="text-gray-600">
                Wishlisted by: {property.wishlists} users
              </p>
            </div>
          ))}
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
