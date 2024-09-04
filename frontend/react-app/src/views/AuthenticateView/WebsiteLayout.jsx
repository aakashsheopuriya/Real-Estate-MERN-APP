import { Drawer } from "antd";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import SellerNavbar from "./Seller/SellerNavbar";

export default function WebsiteLayout() {
 
  return (
    <>
      <SellerNavbar/>
      <main>
        <Outlet />
      </main>
    </>
  );
}
