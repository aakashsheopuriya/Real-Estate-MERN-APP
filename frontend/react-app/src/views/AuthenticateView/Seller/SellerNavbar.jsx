import { Drawer } from "antd";
import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchInput from "../../../components/searchdata/SearchInput";
import {SettingOutlined, UserOutlined} from '@ant-design/icons'
function SellerNavbar() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="fixed z-10 top-0 w-full flex justify-between items-center bg-slate-200 font-serif h-12 text-sm drop-shadow-md">
        <div className="text-blue-700 text-3xl hover:text-blue-500 hover:cursor-pointer pl-2">
          logo
        </div>
        <div>
          <ul className="flex justify-center gap-5  ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Create Property
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-property"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                My Property
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="flex">
          <div className="">
            {/* <input
              type="text"
            placeholder="search"
              className="border border-gray-400 bg-white  rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
            /> */}
            {/* <SearchInput
              placeholder="input search text"
              style={{
                width: 200,
              }}
            /> */}
            <div className="w-4 m-2 hover:cursor-pointer">
            <UserOutlined/>
            </div>
          </div>
          <div
            className="inline-flex h-4 w-4 m-2 hover:cursor-pointer"
            onClick={showDrawer}
          >
            <SettingOutlined />
          </div>
        </div>
        <Drawer title="Settings" onClose={onClose} open={open}>
          <p>Change Property Status</p>
          <p>Edit Profile</p>
          <p>Add Discount to all properties</p>
        </Drawer>
      </div>
    </>
  );
}

export default SellerNavbar;
