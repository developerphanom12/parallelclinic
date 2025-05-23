
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";

const AboutClinic = () => {
  const cursorRef = useRef(null);

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
    <div className="relative w-full bg-[#FDF8E5] overflow-hidden h-full">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />
      
      {/* Content */}
      <div className="flex flex-col sm:pl-16 sm:w-[40%] px-8 sm:py-4">
        {/* Heading */}
        <div style={{ fontFamily: "MyFont" }} className=" text-[#A37159] leading-0">
          <h1 className="sm:text-[70px] text-5xl leading-none">About</h1>
          <h1 className="sm:text-[70px] text-5xl leading-none">Parallel Clinic</h1>
        </div>

        {/* Paragraph */}
        <p className="mt-4 text-lg text-[#848688] leading-tight w-full">
          Parallel Clinic is an entirely online clinic offering<br />
          Personalized Medicine using Active Botanical<br />
          Ingredients.<br />
          Parallel Clinic takes a parallel approach to<br />
          healing: Patients may combine conventional<br />
          medicine alongside highly safe yet non-mainstream,<br />
          cutting-edge treatments.
        </p>
      </div>

      {/* Bottom Right Text */}
      <div className="absolute bottom-6 right-8 text-sm text-gray-700">
        <FaHeadphones size={50} className="text-[#DAA57B]" />
      </div>

      <div className="w-full absolute bottom-16 sm:bottom-8 left-0 flex flex-col items-center px-4 text-center leading-none">
        <h1 style={{ fontFamily: "MyFont" }} className="text-[#A37159] sm:text-4xl text-xl font-bold">
          World Class - Protocols Based Medicine
        </h1>
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
        </h1>
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
        </h1>
      </div>
    </div>
  );
};

export default AboutClinic;
