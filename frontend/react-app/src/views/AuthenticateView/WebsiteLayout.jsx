import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";
import AddButton from "../../components/buttons/AddButton";
import { ArrowLeftOutlined } from "@ant-design/icons";

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
              className="fixed bottom-10 right-10 z-10 bg-blue-700 text-white px-5 p-2 rounded-xl hover:bg-blue-500 transition-all"
              onClick={() => handleBack()}
            />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
