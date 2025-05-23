import React, { useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import gsap from "gsap";
import menuGif from "../assets/MainMenuRing.gif";
import { FaHeadphones } from "react-icons/fa6";
import { IoIosMusicalNote } from "react-icons/io";
import sound from "../assets/sound.gif";
import flower1 from "../assets/flower1.png"; // Replace with your actual image
import { useLocation, useNavigate } from "react-router-dom";
import NavbarMobile from "../components/NavbarMobile";

const JoinTeam = () => {
  const cursorRef = useRef(null);
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);
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


  // Mouse follower
  useEffect(() => {
    const cursor = cursorRef.current;

    const moveCircle = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    const checkMouseLeaveDocument = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    window.addEventListener("mousemove", moveCircle);
    document.addEventListener("mouseout", checkMouseLeaveDocument);

    return () => {
      document.removeEventListener("mouseout", checkMouseLeaveDocument);
      window.removeEventListener("mousemove", moveCircle);
    };
  }, []);

  return (
    <div className="relative w-full  bg-[#FDF8E5] overflow-hidden h-[100vh]">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />

      {/* Navbar */}
      <nav className="w-full flex justify-between items-start px-8 py-4">
        <div className="flex flex-col sm:pl-16 sm:w-[60%]">
          {/* Heading */}
          <div className="mt-18 text-[#A37159] leading-0">
            <h1 style={{ fontFamily: "MyFont" }} className="sm:text-[70px] text-5xl  leading-none">Join Parallel Clinic</h1>
            <h1 style={{ fontFamily: "MyFont" }} className="sm:text-[70px] text-5xl leading-none">Team</h1>
          </div>

        </div>


        {/* Menu Icon + GIF */}
        <div
          className="hidden sm:block relative w-38 h-38 cursor-pointer "
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
          className="sm:hidden block  relative w-32 h-32 cursor-pointer "
          onClick={() => setOpen(!open)}
        >
          <img
            src={menuGif}
            alt="sound gif"
            className="w-full h-full object-cover rounded-full"
          />
          <IoIosMenu size={35} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#C5A184]" />
        </div>

        {/* Mobile Menu */}
      </nav>
      <NavbarMobile open={open} setOpen={setOpen} />

      {showMenu && (
        <div
          style={{ fontFamily: "MyFontNavbar" }}
          className="sm:absolute hidden top-4 right-44 sm:flex  w-fit bg-transparent text-[#848688] gap-12 items-center justify-start text-[30px] z-50"
        >
          {menuItems.map((item, index) => (
            <p
              key={index}
              className={`cursor-pointer transition-opacity duration-300 ${invisibleIndex === index ? "opacity-0" : "opacity-100"
                }`}
              onClick={() => {
                setInvisibleIndex(index); // Make this text invisible
                navigate(item.path);     // Navigate to that route
              }}
            >
              {item.label}
            </p>
          ))}
        </div>
      )}


      {/* Bottom Right Text */}
      <div className="absolute bottom-6 right-8 text-sm text-gray-700">
        <FaHeadphones size={50} className="text-[#DAA57B]" />
      </div>

      <div className="w-full absolute bottom-16 sm:bottom-8 left-0 flex flex-col items-center px-4 text-center leading-none">
        <h1 style={{ fontFamily: "MyFont" }} className="text-[#A37159] sm:text-4xl text-xl font-bold">
          Practice World Class - Protocols Based Medicine
        </h1>
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions        </h1>
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions        </h1>
      </div>

    </div>
  );
};

export default JoinTeam;

