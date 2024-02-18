import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo_transparent.png";
import { FaBars, FaTimes } from "react-icons/fa";
const Navbar = ({ isSignup, isSignin }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  let isUserAuthenticated;
  if (localStorage.getItem("token")) {
    isUserAuthenticated = true;
  } else {
    isUserAuthenticated = false;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
  }
  return (
    <>
      <div className="hidden lg:flex">
        <div className="p-4 h-[70px] w-full flex justify-center shadow-2xl">
          <img src={Logo} alt="Logo" className="h-[40px] absolute left-3 top-4" />
          <div>
            <ul className="flex gap-5">
              <Link
                className="text-[#707070] hover:text-black hover:border-b-2 border-indigo-600"
                to="/"
              >
                HOME
              </Link>
              <Link
                className="text-[#707070] hover:text-black hover:border-b-2 border-indigo-600"
                to="/courses"
              >
                COURSES
              </Link>
              <Link
                className="text-[#707070] hover:text-black hover:border-b-2 border-indigo-600"
                to="/dashboard"
              >
                DASHBOARD
              </Link>
              <Link
                className="text-[#707070] hover:text-black hover:border-b-2 border-indigo-600"
                to="/collaborate"
              >
                COLLABORATE
              </Link>
              <Link className="text-[#707070] hover:text-black hover:border-b-2 border-indigo-600" to="/dailyquest">
                DAILY QUEST
              </Link>
            </ul>
          </div>
          <div className="absolute right-3 top-3">
            {isUserAuthenticated ? (
              <div onClick={handleLogout} className="py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382BF0] hover:-translate-y-1 duration-300">
                <Link to="/signin">LOG OUT</Link>
              </div>
            ) : (
              <div>
                {isSignup && (
                  <div className="py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382BF0] hover:-translate-y-1 duration-300">
                    <Link to="/signin">LOG IN</Link>
                  </div>
                )}
                {isSignin && (
                  <div className="py-2 mt-1 px-4 mx-2 inline-block rounded-full shadow-2xl bg-[#4F46E5] text-[#FFFFFF] hover:bg-[#382BF0] hover:-translate-y-1 duration-300">
                    <Link to="/signup">SIGN UP</Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* hamburger */}
      <div
        onClick={handleClick}
        className="lg:hidden z-40 text-black p-3 h-[70px] w-full flex justify-between shadow-2xl"
      >
        <img className="h-[40px]" src={Logo} alt="Logo" />
        <div className="mt-2">
          {nav ? <FaTimes size={30} /> : <FaBars size={25} />}
        </div>
      </div>
      {/* mobile menu */}
      <ul
        className={
          nav
            ? "absolute z-20 top-0 left-0 w-full h-screen bg-[#E0E0E0] flex flex-col justify-center items-center"
            : "hidden"
        }
      >
        <li className="py-3 text-3xl">
          <Link onClick={handleClick} to="/" smooth={"true"} duration={500}>
            HOME
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/courses"
            smooth={"true"}
            duration={500}
          >
            COURSES
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/dashboard"
            smooth={"true"}
            duration={500}
          >
            DASHBOARD
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/collaborate"
            smooth={"true"}
            duration={500}
          >
            COLLABORATE
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/dailyquest"
            smooth={"true"}
            duration={500}
          >
            DAILY QUEST
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/signin"
            smooth={"true"}
            duration={500}
          >
            LOG IN
          </Link>
        </li>
        <li className="py-3 text-3xl">
          <Link
            onClick={handleClick}
            to="/signup"
            smooth={"true"}
            duration={500}
          >
            SIGN UP
          </Link>
        </li>
      </ul>
    </>
  );
};
export default Navbar;