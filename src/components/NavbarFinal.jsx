import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import menuGif from "../assets/p2.gif";
import logoClinic from "../assets/Parallel_logo.png";
import NavbarMobile from "./NavbarMobile";
import NameLogo from "../assets/NameLogo.jpg";

const NavbarFinal = () => {
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
          <nav className="bg-[#FDF8E5] w-full lg:pr-8 relative h-[10vh] lg:h-[12vh] ">
            <div className="flex justify-between items-center h-full px-4  relative">
              {/* Logo - Visible on mobile and tablet */}

                 <div className="hidden xl:block w-[24vw]">
                  <img
                    src={NameLogo}
                    className="scale-75 cursor-pointer"
                    alt="Parallel Clinic Logo"
                    onClick={() => navigate("/")}
                  />
                </div>
                <div className="block xl:hidden  pl-4">
                    <img
                    src={logoClinic}
                    className="w-[65px] h-[50px] cursor-pointer"
                    alt="Parallel Clinic Logo"
                    onClick={() => navigate("/")}
                    />
                </div>
    
              {/* Menu Icon - Right side for mobile, tablet and desktop */}
              <div className="absolute top-2 right-2 z-50 flex flex-col items-center justify-center">
                {/* Desktop Menu Icon */}
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
    
                {/* Mobile and Tablet Menu Icon */}
                <div
                  className="lg:hidden block relative w-20 h-20 cursor-pointer scale-150"
                //   onClick={location .pathname == "/" ? () => navigate("/choose") : handleMenuClick}
                onClick={() => handleMenuClick()}
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
              className="absolute top-4 right-44 hidden lg:flex w-fit bg-transparent text-[#848688] gap-12 items-center justify-start text-[25px] z-50"
            >
              <h2 className={`cursor-pointer ${location.pathname === "/about" || location.pathname === "/about2" || location.pathname === "/" ? "invisible" : ""}`}
      onClick={() => navigate("/about")}>
                About Parallel Clinic
              </h2>
              <h2 className={`cursor-pointer ${location.pathname === "/medicalconditions" ? "invisible" : ""}`} onClick={() => navigate("/medicalconditions")}>
                Medical Conditions
              </h2>
              <h2 className={`cursor-pointer ${location.pathname.includes("/joinparallelclinic") ? "invisible" : ""}`}
      onClick={() => navigate("/joinparallelclinic")}>
                Join Parallel Clinic Team
              </h2>
            </div>
          )}
        </>
  )
}

export default NavbarFinal
