import { Drawer, Popover } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  SettingOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import ImageContext, {
  ImageContextData,
} from "../../../context/ImageContextData";
import axios from "axios";
console.log(ImageContext);
function SellerNavbar() {
  const { imageNameData, setImageNameData } = useContext(ImageContextData);
  console.log("imageName from context in seller navbar.jsx", imageNameData);
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
    setImageNameData(res.data.user.image);
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
    getSpecificUserDetails();
  }, [email, navigate]);

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
                to="/dashboard"
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
                to="/dashboard/create"
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
                to="/dashboard/my-property"
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
          <div
            className="inline-flex h-4 w-4 m-2 hover:cursor-pointer"
            onClick={showDrawer}
          >
            <SettingOutlined />
          </div>
        </div>
        <Drawer title="Settings" onClose={onClose} open={open}>
          <ul type="none">
            <li className="bg-blue-500 p-3 m-2 gap-2 rounded-2xl text-white">
              <Link to="/dashboard/account-information">
                Account Information
              </Link>
            </li>
            <Popover
              content={<Link onClick={hideLanguage}>English</Link>}
              title="Languages"
              trigger="click"
              open={openLanguage}
              onOpenChange={handleOpenLanguageChange}
            >
              <li className="bg-blue-500 p-3 m-2 gap-2 rounded-2xl text-white">
                <Link>Language settings</Link>
              </li>
            </Popover>

            <li className="bg-blue-500 p-3 m-2 gap-2 rounded-2xl text-white">
              <Link to="/dashboard/help-and-support">Help & Support</Link>
            </li>

            <li className="bg-blue-500 p-3 m-2 gap-2 rounded-2xl text-white">
              <Link to="/dashboard/privacy-and-policies">
                Privacy & Policies
              </Link>
            </li>
            <li
              // onClick={() => localStorage.removeItem("email")}
              className="bg-blue-500 p-3 m-2 gap-2 rounded-2xl text-white"
            >
              <Popover
                content={
                  <Link
                    onClick={hideSignoutPopup}
                    className="text-white bg-red-500 px-4 py-2 rounded-lg flex justify-center items-center"
                  >
                    Yes
                  </Link>
                }
                title="Really Want to Signout"
                trigger="click"
                open={openSignoutPopup}
                onOpenChange={() => handleOpenSignoutPopupChange()}
              >
                <Link>
                  <LoginOutlined />
                  <span className="ml-2">SignOut</span>
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
