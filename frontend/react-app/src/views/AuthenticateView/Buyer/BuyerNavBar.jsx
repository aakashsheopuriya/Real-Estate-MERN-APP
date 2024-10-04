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
function BuyerNavBar() {
  const { imageNameData, setImageNameData } = useContext(ImageContextData);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, navigate]);

  return (
    <>
      <div className="sticky z-10 top-0 w-full flex justify-between items-center bg-white  h-16 text-sm drop-shadow-md">
        {/* Logo Section */}
        <div className="text-blue-700 text-3xl hover:text-blue-500 hover:cursor-pointer pl-2">
          <img
            src={`${process.env.PUBLIC_URL}/HomeLogo.png`}
            alt=""
            className="h-10 rounded-lg"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden pr-4">
          <button onClick={toggleMobileMenu}>
            <MenuOutlined className="text-2xl" />
          </button>
        </div>

        {/* Links Section - Hidden on small screens */}
        <div className="hidden md:flex">
          <ul className="flex justify-center text-lg gap-5">
            <li>
              <NavLink
                to="/buyer-dashboard"
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
                to="all-property"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                All Property
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buyer-dashboard/my-wishlist"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Wishlist
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
                  src={`${process.env.REACT_APP_BACKEND_URL}/user/api/download/${imageNameData}`}
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

        {/* Settings Drawer */}
        <Drawer
          title="Settings"
          onClose={onClose}
          open={open}
          className="font-poppins"
        >
          <ul type="none">
            <Link to="/buyer-dashboard/account-information">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
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
                  Language Settings
                </li>
              </Link>
            </Popover>
            <Link to="/buyer-dashboard/help-and-support">
              <li className="bg-blue-500 hover:bg-blue-600 p-3 m-2 gap-2 rounded-2xl text-white">
                Help & Support
              </li>
            </Link>
            <Link to="/buyer-dashboard/privacy-and-policies">
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
                title="Do you want to Signout?"
                trigger="click"
                open={openSignoutPopup}
                onOpenChange={() => handleOpenSignoutPopupChange()}
              >
                <Link className="hover:text-red-700 font-semibold p-4">
                  <span>SignOut</span>
                  <LoginOutlined className="ml-3" />
                </Link>
              </Popover>
            </li>
          </ul>
        </Drawer>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <ul className="flex flex-col text-base gap-5 p-5">
            <li>
              <NavLink
                to="/buyer-dashboard"
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
                to="all-property"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                All Property
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buyer-dashboard/my-wishlist"
                className={({ isActive }) =>
                  `hover:text-blue-700 ${
                    isActive ? "text-blue-500" : "text-black"
                  }`
                }
              >
                Wishlist
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default BuyerNavBar;
