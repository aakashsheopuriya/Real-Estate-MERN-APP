import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";
import AddButton from "../../components/buttons/AddButton";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Footer from "./Footer";

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
