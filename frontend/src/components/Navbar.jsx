import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/assistant"}>
          <li className="py-1">ASSISTANT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        {/* <NavLink to={"https://med-recomendation-system.onrender.com/"}>
          <li className="py-1">MEDICINE RECOMMENDATION SYSTEM</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink> */}
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData?.image} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base text-gray-600 z-10 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointment");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create account
          </button>
        )}
        <img
          onClick={() => {
            setShowMenu(true);
          }}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        
        {/** Mobile menu overlay */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setShowMenu(false)}
          ></div>
        )}
        
        {/** Mobile menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-30 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => {
                setShowMenu(false);
              }}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col gap-1 mt-5 px-4">
            <NavLink to={"/"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                HOME
              </li>
            </NavLink>
            <NavLink to={"/doctors"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                DOCTORS
              </li>
            </NavLink>
            <NavLink to={"/about"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                ABOUT
              </li>
            </NavLink>
            <NavLink to={"/contact"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                CONTACT
              </li>
            </NavLink>
            <NavLink to={"/assistant"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                ASSISTANT
              </li>
            </NavLink>
            <NavLink to={"https://med-recomendation-system.onrender.com/"}>
              <li
                className="px-4 py-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => {
                  setShowMenu(false);
                }}
              >
                MEDICINE RECOMMENDATION
              </li>
            </NavLink>
            {!token && (
              <li
                className="px-4 py-3 mt-4"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/login");
                }}
              >
                <button className="bg-primary text-white w-full py-2 rounded-full">
                  Create account
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
