import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/LOGO-Model.png";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

const Service = [
  { name: "Interior Design", href: "/InteriorDesign" },
  { name: "Conceptualization", href: "/Conceptualization" },
  { name: "Consultancy", href: "/Consultancy" },
  { name: "TurnkeyContracting", href: "/TurnkeyContracting" },
];

const NavBar = () => {

  const { currentUser, logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingUp(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu when any link is clicked
    setDropdownOpen(false); // Close the dropdown if it's open
  };

  //User login
  const [userData, setUserData] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/login/success", {
        withCredentials: true,
      });
      console.log("response", response);

      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);


  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <nav
      className={`bg-darkblue fixed top-0 left-0 w-full z-50 transform transition-transform duration-300 py-2 ${
        scrollingUp ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className=" px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-white text-lg font-bold">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="sm:w-[70px] sm:h-[60px] w-[50px] h-[40px] bg-transparent "
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-1 text-md">
            <Link
              to="/"
              onClick={handleLinkClick}
              className="px-4 py-2 text-silver hover:border-2 hover:text-sm rounded-lg transition-all cursor-pointer "
            >
              Home
            </Link>
            <Link
              to="/DesignGallery"
              onClick={handleLinkClick}
              className="px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer"
            >
              Design Gallery
            </Link>

            <Link
              to="/Projects"
              onClick={handleLinkClick}
              className="px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer"
            >
              Recent Project
            </Link>

            {/* Services Dropdown */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className=" flex items-center justify-center px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer"
            >
              Service
              <button className="ml-2 h-4 w-4">
                {!dropdownOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </button>
              {dropdownOpen && (
                <div className="absolute top-[60px] mt-15 w-58 bg-darkblue shadow-lg rounded-lg z-40 text-silver py-2 px-2 ">
                  <ul className="py-3">
                    {Service.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          onClick={handleLinkClick}
                          className="shadow-md block px-4 py-2 text-sm hover:border-y-2  rounded-md"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>

            <Link
              to="/About"
              onClick={handleLinkClick}
              className="px-4 py-2 text-silver hover:border-b-2 hover:text-sm rounded-lg  transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer"
            >
              Contact Us
            </Link>
            <Link to="/SmartStyleQuiz"
            className="px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer">
                StyleQuiz
            </Link>
          </div>

          <div className="flex justify-center items-center gap-5">
            {/* Search */}
            {/* <div className="relative sm:w-50 w-32 space-x-3">
              <BsSearch className="absolute inline-block left-6 text-darkblue md:inset-y-2 inset-y-[5px] " />
              <input
                type="text"
                placeholder="Search"
                className=" bg-silver rounded-2xl md:px-15 px-8 md:py-[8px] py-[5px] w-full text-xs  focus:outline-none"
              />
            </div> */}

            {/* Login */}
          </div>
     <div className="flex items-center gap-4 relative">
        {currentUser ? (
          <>
            <div className="flex items-center gap-2">
              <img
                src={currentUser.image}
                alt="Profile"
                className="sm:w-[40px] sm:h-[40px] w-[32px] h-[32px] rounded-full border border-silver"
              />
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="text-silver hover:text-white font-medium text-sm sm:text-base"
                >
                  {currentUser.displayName}
                </button>
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-darkblue border border-gray-700 rounded-lg shadow-lg z-50">
                    <Link
                      to={currentUser.role === 'admin' ? '/dashboard' : '/UserDashboard'}
                      onClick={handleLinkClick}
                      className="block px-4 py-2 text-silver hover:bg-silver hover:text-darkblue text-sm rounded-t-lg"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-silver hover:bg-silver hover:text-darkblue text-sm rounded-b-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <Link
            to="/LoginPage"
            onClick={handleLinkClick}
            className="px-4 py-2 text-silver hover:border-2 hover:text-sm rounded-lg transition-all cursor-pointer"
          >
            Login
          </Link>
        )}
      </div>
          {/* Hamburger Menu */}
          <div
            className="md:hidden px-2 cursor-pointer text-silver sm:text-3xl text-xl"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <button>{!isOpen ? <FaBars /> : <RxCross2 />}</button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className=" w-full  flex flex-col justify-center items-center md:hidden  pt-2 pb-3 space-y-1">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="text-gray-300 hover:bg-silver hover:text-darkblue block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/DesignGallery"
            onClick={handleLinkClick}
            className="px-4 py-2 text-silver hover:bg-silver hover:text-darkblue rounded-3xl transition-all cursor-pointer"
          >
            Design Gallery
          </Link>

          <Link
            to="/Projects"
            onClick={handleLinkClick}
            className="text-gray-300 hover:bg-silver hover:text-darkblue block px-3 py-2 rounded-md text-base font-medium"
          >
            Recent Project
          </Link>

          {/* Services Dropdown */}
          <Link
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-5 py-2  text-silver rounded-3xl transition-all cursor-pointer"
          >
            Service
            <button className="ml-2 h-4 w-4">
              {!dropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </button>
            {dropdownOpen && (
              <div className=" mt-15 w-58 bg-darkblue shadow-lg rounded-lg  text-silver py-2 px-2 ">
                <ul className="py-3">
                  {Service.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        onClick={handleLinkClick}
                        className="  shadow-md block px-4 py-2 text-md hover:bg-silver hover:text-darkblue rounded-md"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Link>

          <Link
            to="/about"
            onClick={handleLinkClick}
            className="text-gray-300 hover:bg-silver hover:text-darkblue block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className="text-gray-300 hover:bg-silver hover:text-darkblue block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
