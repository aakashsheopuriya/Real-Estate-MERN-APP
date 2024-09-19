import { Drawer, Popover } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { ImageContextData } from "../../../context/ImageContextData";
import axios from "axios";
function SellerNavbar() {
  const { imageNameData, setImageNameData } = useContext(ImageContextData);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const [openSignoutPopup, setOpenSignoutPopup] = useState(false);
  const hideSignoutPopup = () => {
    setOpenSignoutPopup(false);
    localStorage.removeItem("email");
  };
  const handleOpenSignoutPopupChange = (newOpen) => {
    setOpenSignoutPopup(newOpen);
  };

  const [openLanguage, setOpenLanguage] = useState(false);
  const hideLanguage = () => {
    setOpenLanguage(false);
  };
  const handleOpenLanguageChange = (newOpen) => {
    setOpenLanguage(newOpen);
  };

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const getSpecificUserDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/user/api/user/${email}`
    );
    setImageNameData(res?.data?.user?.image);
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
    getSpecificUserDetails();
  }, [email, navigate]);

  return (
    <>
      <div className="sticky z-10 top-0 w-full flex justify-between items-center bg-white  h-12 text-sm drop-shadow-md">
        <div className="text-blue-700 text-3xl hover:text-blue-500 hover:cursor-pointer pl-2">
          {/* <img src={`${process.env.PUBLIC_URL}/logo.jpg`} alt="" className="h-6 rounded-lg " /> */}
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
                to="/seller-dashboard/create"
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
                to="/seller-dashboard/my-property"
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
        <div className="flex gap-1">
          <Link to="/seller-dashboard/account-information">
            <div className="">
              {imageNameData ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${imageNameData}`}
                  alt="Preview"
                  className="relative top-1 w-6 h-6 object-cover rounded-full"
                />
              ) : (
                <div className="w-4 m-2 hover:cursor-pointer">
                  <UserOutlined />
                </div>
              )}
            </div>
          </Link>
          <div
            className="inline-flex h-4 w-4 m-2 hover:cursor-pointer"
            onClick={showDrawer}
          >
            <SettingOutlined />
          </div>
        </div>
        <Drawer
          title="Settings"
          onClose={onClose}
          open={open}
          className="font-poppins"
        >
          <ul type="none">
            <Link to="/seller-dashboard/account-information">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white ">
                Account Information
              </li>
            </Link>
            <Popover
              content={<Link onClick={hideLanguage}>English</Link>}
              title="Languages"
              trigger="click"
              open={openLanguage}
              onOpenChange={handleOpenLanguageChange}
            >
              <Link>
                <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
                  Language settings
                </li>
              </Link>
            </Popover>
            <Link to="/seller-dashboard/help-and-support">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
                Help & Support
              </li>
            </Link>
            <Link to="/seller-dashboard/privacy-and-policies">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
                Privacy & Policies
              </li>
            </Link>
            <li className="bg-slate-500 hover:bg-slate-300 p-3 m-2 gap-2 rounded-2xl text-white absolute bottom-2 right-2">
              <Popover
                content={
                  <Link
                    onClick={hideSignoutPopup}
                    className="text-white bg-red-500 px-4 py-2 rounded-lg flex justify-center items-center"
                  >
                    Yes
                  </Link>
                }
                title="Do you want to Signout ?"
                trigger="click"
                open={openSignoutPopup}
                onOpenChange={() => handleOpenSignoutPopupChange()}
              >
                <Link className=" hover:text-red-700 font-semibold p-4">
                  <span>SignOut</span>
                  <LoginOutlined className="ml-3" />
                </Link>
              </Popover>
            </li>
          </ul>
        </Drawer>
      </div>
    </>
  );
}

export default SellerNavbar;
