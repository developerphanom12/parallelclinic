import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import menuGif from "../assets/p2.gif";
import logoClinic from "../assets/logoClinic.png";
import NavbarMobile from "./NavbarMobile";

const NewNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = () => {
    // For all non-desktop devices, toggle the mobile menu
    setOpen(!open);
  };

  return (
    <>
      <nav className="bg-[#FDF8E5] w-full lg:px-8 relative h-[10vh] ">
        <div className="flex justify-between items-center h-full px-4 lg:pl-10 pl-4 relative">
          {/* Logo - Visible on mobile and tablet */}
          <div className="lg:hidden block">
            <img
              src={logoClinic}
              className="w-[50px] h-[50px] cursor-pointer"
              alt="Parallel Clinic Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Empty div for desktop to maintain spacing */}
          <div className="hidden lg:block"></div>

          {/* Menu Icon - Right side for mobile, tablet and desktop */}
          <div className="absolute top-2 right-2 z-50 flex flex-col items-center justify-center">

            <div className="hidden lg:block">
            <img
              src={logoClinic}
              className="w-[50px] h-[50px] cursor-pointer"
              alt="Parallel Clinic Logo"
              onClick={() => navigate("/")}
            />
          </div>

            {/* Desktop Menu Icon */}
          { location.pathname == "/" ?   <div
              className="lg:block hidden relative w-28 h-28 cursor-pointer scale-150"
              onClick={() => navigate("/choose")}
            >
              <img
                src={menuGif}
                alt="menu background"
                className="w-full h-full object-cover rounded-full"
              />
              <IoIosMenu
                size={30}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C5A184]"
              />
            </div>  :
             <div
              className="lg:block hidden relative w-28 h-28 cursor-pointer scale-150"
              onClick={() => setShowMenu(!showMenu)}
            >
              <img
                src={menuGif}
                alt="menu background"
                className="w-full h-full object-cover rounded-full"
              />
              <IoIosMenu
                size={30}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C5A184]"
              />
            </div> 
            }

            {/* Mobile and Tablet Menu Icon */}
            <div
              className="lg:hidden block relative w-20 h-20 cursor-pointer scale-150"
              onClick={handleMenuClick}
            >
              <img
                src={menuGif}
                alt="menu background"
                className="w-full h-full object-cover rounded-full"
              />
              <IoIosMenu 
                size={35} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#C5A184]" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile and Tablet Menu */}
      <NavbarMobile open={open} setOpen={setOpen} />

      {/* Desktop Menu Items */}
      {showMenu && (
        <div
          style={{ fontFamily: "MyFontNavbar" }}
          className="absolute top-4 right-44 hidden lg:flex w-fit bg-transparent text-[#848688] gap-12 items-center justify-start text-[30px] z-50"
        >
          <h2 className="cursor-pointer" onClick={() => navigate("/about")}>
            About Parallel Clinic
          </h2>
          <h2 className="cursor-pointer" onClick={() => navigate("/medicalconditions")}>
            Medical Conditions
          </h2>
          <h2 className="cursor-pointer" onClick={() => navigate("/joinparallelclinic")}>
            Join Parallel Clinic Team
          </h2>
        </div>
      )}
    </>
  );
};

export default NewNavbar;