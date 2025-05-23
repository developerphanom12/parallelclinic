import React, { useState, useEffect } from "react";
import { IoIosMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import menuGif from "../assets/p2.gif";
import logoClinic from "../assets/logoClinic.png";
import NavbarMobile from "./NavbarMobile";

const Nav = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [invisibleIndex, setInvisibleIndex] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { label: "About Parallel Clinic", path: "/about" },
    { label: "Medical Conditions", path: "/medicalconditions" },
    { label: "Join Parallel Clinic Team", path: "/joinparallelclinic" },
  ];

  useEffect(() => {
    const currentIndex = menuItems.findIndex(item => item.path === location.pathname);
    setInvisibleIndex(currentIndex);
  }, [location.pathname]);

  return (
    <>
      <nav className="bg-[#FDF8E5] w-full flex justify-between items-start px-8">
        <div className="flex sm:flex-row flex-col mt-10">
          {/* Logo */}
          <img src={logoClinic} className="w-16 h-16 sm:absolute sm:top-3 cursor-pointer" alt="Parallel Clinic Logo"  onClick={()=>{navigate("/")}}/>
        </div>

        {/* Menu Icon + GIF */}
        <div
          className="hidden sm:block relative ml-60 w-38 h-38 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          <img
            src={menuGif}
            alt="sound gif"
            className="w-full h-full object-cover rounded-full"
          />
          <IoIosMenu size={35} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#C5A184]" />
        </div>

        <div
          className="sm:hidden block relative w-32 h-32 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <img
            src={menuGif}
            alt="sound gif"
            className="w-full h-full object-cover rounded-full"
          />
          <IoIosMenu size={35} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#C5A184]" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <NavbarMobile open={open} setOpen={setOpen} />

      {showMenu && (
        <div
          style={{ fontFamily: "MyFontNavbar" }}
          className="sm:absolute hidden top-4 right-44 sm:flex w-fit bg-transparent text-[#848688] gap-12 items-center justify-start text-[30px] z-50"
        >
          {menuItems.map((item, index) => (
            <p
              key={index}
              className={`cursor-pointer transition-opacity duration-300 ${
                invisibleIndex === index ? "opacity-0" : "opacity-100"
              }`}
              onClick={() => {
                setInvisibleIndex(index);
                navigate(item.path);
              }}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}

      
    </>
  );
};

export default Nav;