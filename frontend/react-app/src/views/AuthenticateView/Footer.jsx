import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
//   LinkedInOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" text-white py-8">

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-4 mt-8 text-center text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Real Estate Company. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
