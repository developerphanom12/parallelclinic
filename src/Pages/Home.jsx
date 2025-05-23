import React, { useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import gsap from "gsap";
import menuGif from "../assets/p2.gif";
import { FaHeadphones } from "react-icons/fa6";
import { IoIosMusicalNote } from "react-icons/io";
import sound from "../assets/sound.gif";
import MusicPlayer from "../components/MusicPlayer";
import { useLocation, useNavigate } from "react-router-dom";
import logoClinic from "../assets/logoClinic.png"; // Replace with your actual image
import NavbarMobile from "../components/NavbarMobile";
import video from "../assets/fonts/video1.mp4"; // Replace with your actual video

const Home = () => {
  const cursorRef = useRef(null);
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

  // GSAP Mouse Follower
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
      // If relatedTarget is null, mouse left viewport
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
    <div className="relative w-full h-screen bg-[#FDF8E5] overflow-hidden ">
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="w-12 h-12  border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999] "
      />

      {/* Circular Video */}


      {/* <div className="absolute h-[100vh] w-[100vw] flex justify-end items-left">
        <div className="sm:w-[60vw] sm:h-[60vh] h-[160px] w-[360px] overflow-hidden">
          <video
            src={video}
            // src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your actual video URL
            // src="https://drive.google.com/file/d/135Zrk7PjpJvrto6qMDjlb4IENv2yQreA"
            autoPlay
            loop
            muted
            className="w-full h-full object-contain "
          />
          <iframe
  src="https://drive.google.com/file/d/135Zrk7PjpJvrto6qMDjlb4IENv2yQreA/preview"
  allow="autoplay"
  className="w-full h-full"
  style={{ border: "none" }}
   ></iframe>

        </div>
      </div> */}

      <div className="absolute h-[100vh] w-[100vw] flex justify-end items-start sm:items-end sm:justify-start sm:bottom-0 sm:left-[10%]">
        <div className="sm:w-[60vw] sm:h-[60vh] h-[160px] w-[360px] overflow-hidden">
          <video
            src={video}
            autoPlay
            loop
            muted
            className="w-full h-full object-contain"
          />
        </div>
      </div>




      {/* Navbar */}
      <nav className="w-full flex justify-between items-start px-8 py-4">
        <div className="flex sm:flex-row flex-col mt-18">

          {/* Logo */}
          <img src={logoClinic} className="w-16 h-16 sm:absolute sm:top-9 " />

          {/* Heading */}
          <h1 style={{ fontFamily: 'MyFont' }} className="sm:text-7xl text-5xl sm:pl-16  w-[105%] sm:w-[70%]  text-[#C5A184] ">
            Let’s Make Your Health Sound!
          </h1>
        </div>

        {/* Menu Icon + GIF */}
        <div
          className="hidden sm:block relative ml-90 w-38 h-38 cursor-pointer "
          onClick={() => navigate("/choose")}
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
        <NavbarMobile open={open} setOpen={setOpen} />
      </nav>

      <MusicPlayer />

      {showMenu && (
        <div
          style={{ fontFamily: "MyFontNavbar" }}
          className="absolute top-4 right-44 flex w-fit bg-transparent text-[#848688] gap-12 items-center justify-start text-[30px] z-50"
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


    </div>
  );
};

export default Home;
