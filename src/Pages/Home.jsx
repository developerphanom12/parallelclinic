import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MusicPlayer from "../components/MusicPlayer";
import logoClinic from "../assets/logoClinic.png";
import video from "../assets/fonts/Flower_webm.webm";

const Home = () => {
  const cursorRef = useRef(null);
 

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
    <div className="relative w-full h-screen bg-[#FDF8E5] overflow-hidden">
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />

      {/* Video Container - Optimized for all screen sizes */}
      <div className="absolute top-[160px]  flex items-center justify-center sm:items-end sm:justify-center sm:pb-10 sm:pl-[10%]">
        <div className="w-[100%] h-auto sm:w-[100%] sm:h-auto max-h-[50vh]  sm:max-h-[70vh] overflow-hidden rounded-lg">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col sm:flex-row px-6 sm:px-8 ">
        {/* Logo */}
        <img 
          src={logoClinic} 
          alt="Parallel Clinic Logo"
          className="w-16 h-16 mb-4 sm:mb-0 sm:absolute sm:top-4" 
        />

        {/* Heading */}
        <h1 
          style={{ fontFamily: 'MyFont' }} 
          className="text-4xl sm:text-5xl md:text-7xl sm:pl-16 w-full sm:w-[70%] text-[#C5A184] leading-tight"
        >
          Let's Make Your Health Sound!
        </h1>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default Home;
