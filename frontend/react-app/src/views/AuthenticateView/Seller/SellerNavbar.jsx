import { Drawer, Popover } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { ImageContextData } from "../../../context/ImageContextData";
import axios from "axios";
function SellerNavbar() {
  const { imageNameData, setImageNameData } = useContext(ImageContextData);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleClickmobileMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
    localStorage.removeItem("role");
    localStorage.removeItem("token");
  };
  const handleOpenSignoutPopupChange = () => {
    setOpenSignoutPopup(true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigate]);

  return (
    <>
      <div className="sticky z-20 top-0 w-full flex justify-between items-center bg-white h-16 text-sm drop-shadow-md">
        <div className="text-blue-700 text-3xl hover:text-blue-500 hover:cursor-pointer pl-2">
          <NavLink to="/buyer-dashboard">
            <img
              src={`${process.env.PUBLIC_URL}/HomeLogo.png`}
              alt=""
              className="h-10 rounded-lg"
            />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMobileMenu}>
            <MenuOutlined className="text-2xl" />
          </button>
        </div>

        {/* Links - hidden on small screens */}
        <div className="hidden md:flex">
          <ul className="flex justify-center text-lg gap-5">
            <li>
              <NavLink
                to="/seller-dashboard"
                end
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

        {/* User Icon & Settings */}
        <div className="flex items-center gap-4 pr-4">
          <Link to="/buyer-dashboard/account-information">
            <div className="flex items-center">
              {imageNameData ? (
                <img
                  src={imageNameData}
                  alt="Preview"
                  className="w-8 h-8 object-cover rounded-full"
                />
              ) : (
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                  <UserOutlined className="text-lg" />
                </div>
              )}
            </div>
          </Link>
          <div
            className="flex items-center justify-center w-8 h-8 cursor-pointer rounded-full bg-gray-200"
            onClick={showDrawer}
          >
            <SettingOutlined className="text-xl" />
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
            <Link to="/seller-dashboard/requested-properties">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
                View Requested Properties
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

      {/* Mobile Menu - hidden by default */}
      {mobileMenuOpen && (
        <div className="md:hidden sticky top-16 z-10 bg-white">
          <ul className="flex flex-col text-base gap-5 p-5">
            <li>
              <NavLink
                to="/seller-dashboard"
                end
                onClick={handleClickmobileMenuOpen}
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
                onClick={handleClickmobileMenuOpen}
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
                onClick={handleClickmobileMenuOpen}
              >
                My Property
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default SellerNavbar;
