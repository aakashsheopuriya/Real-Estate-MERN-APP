import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";
import AddButton from "../../components/buttons/AddButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import BuyerNavBar from "./Buyer/BuyerNavBar";

export default function WebsiteLayout() {
  const navigate = useNavigate();
  const role=localStorage.getItem("role");
  console.log("role",role);
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="bg-slate-100 min-h-screen font-poppins">
      {role==="buyer"?<BuyerNavBar/>:<SellerNavbar/>}

        <div className="bg-slate-100 min-h-screen">
          <main className="">
            <AddButton
              name={<ArrowLeftOutlined />}
              className="fixed bottom-10 right-10 z-10 bg-slate-600 hover:bg-slate-300 hover:text-black text-white px-5 p-2 rounded-xl transition-all"
              onClick={() => handleBack()}
            />
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
