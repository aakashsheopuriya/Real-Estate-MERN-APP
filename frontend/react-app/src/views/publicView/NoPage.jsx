import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NoPage() {
  const navigate = useNavigate();
  const handleBack = async () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
        <Link
          onClick={handleBack}
          to="/login"
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
