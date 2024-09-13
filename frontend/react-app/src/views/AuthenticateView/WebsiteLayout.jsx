import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";
import AddButton from "../../components/buttons/AddButton";

export default function WebsiteLayout() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <SellerNavbar />

        <div className="bg-slate-100 min-h-screen">
          <main className="relative top-14 ">
            <AddButton
              name="Back"
              className="bg-blue-400 rounded-xl p-2 m-2"
              onClick={() => handleBack()}
            />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
