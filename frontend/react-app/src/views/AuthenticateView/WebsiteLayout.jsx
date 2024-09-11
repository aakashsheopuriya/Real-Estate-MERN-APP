import { Drawer } from "antd";
import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";
import AddButton from "../../components/buttons/AddButton";

export default function WebsiteLayout() {
  const navigate=useNavigate();
  const handleBack=()=>{
    navigate(-1)
  }
  return (
    <>
      <SellerNavbar />

      <div className="bg-slate-100 min-h-screen">
        <main className="relative top-14 ">
          <AddButton name="Back" className="bg-blue-400 rounded-xl p-2 m-2" onClick={()=>handleBack()}/>
          <Outlet />
        </main>
      </div>
    </>
  );
}
