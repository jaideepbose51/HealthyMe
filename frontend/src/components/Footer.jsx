import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* Left section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="HealthyMe Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            HealthyMe is dedicated to bridging healthcare gaps in
            underserved communities by providing access to essential health
            services at little to no cost. Through partnerships with local
            governments and NGOs, we address critical health issues, including
            maternal care, chronic illness management, and malnutrition. Our
            platform empowers communities by organizing health camps, mobile
            clinics, and vaccination drives, making healthcare more accessible
            and improving quality of life. By sponsoring these initiatives,
            Providence not only enhances public health but also fosters
            long-term relationships, building a foundation for a healthier
            future for all.
          </p>
        </div>

        {/* Center section */}
        <div>
  <p className="text-xl font-medium mb-5">COMPANY</p>
  <ul className="flex flex-col gap-2 text-gray-600">
    <li>
      <button 
        onClick={() => navigate("/")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        Home
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/about")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        About Us
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/contact")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        Contact Us
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/privacy-policy")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        Privacy Policy
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/curanet")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        CURANET
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/healtheducation")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        DOCS
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/ehr")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        EHR
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/healthaccess")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        CARELINK
      </button>
    </li>
    <li>
      <button 
        onClick={() => navigate("/sponsors")} 
        className="hover:text-gray-800 w-full text-left cursor-pointer"
      >
        SPONSORS
      </button>
    </li>
  </ul>
</div>

        {/* Right section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-7870385856</li>
            <li>jaideepbose51@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2025 © HealthyMe - All Rights Reserved
        </p>
        <p className="py-5 text-sm text-center">
          Made with ❤️ by Jaideep, Prachi, Nikhil & Anushka
        </p>
      </div>
    </div>
  );
};

export default Footer;
