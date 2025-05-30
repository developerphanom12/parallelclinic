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
    <div className="relative w-full h-full sm:h-[84vh] bg-[#FDF8E5] overflow-hidden">
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col px-6 sm:px-8 pt-0">
        <h1
          style={{ fontFamily: "MyFont" }}
          className="text-4xl sm:text-5xl md:text-7xl sm:pl-16 w-full sm:w-[70%] text-[#C5A184] leading-tight"
        >
          Let's Make Your Health <br />
          Sound!
        </h1>
      </div>

      {/* Video Container - Fixed at bottom */}
      <div className="absolute sm:bottom-0 bottom-60 sm:left-0 w-full flex justify-center items-end z-5">
        <div className="w-full sm:w-[100%] md:w-[100%] h-[40vh] sm:h-[50vh] md:h-[70vh] overflow-hidden">
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain"
            style={{ 
              objectPosition: "left bottom",
              mixBlendMode: "multiply" ,
              paddingLeft:"40px"
            }}
          />
        </div>
      </div>

      <MusicPlayer />     
    </div>
  );
};

export default Home;
  