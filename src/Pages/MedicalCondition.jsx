import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";

const MedicalCondition = () => {
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
      <div className="flex flex-col sm:pl-16 sm:w-[60%] px-8 py-4">
        {/* Heading */}
        <div className=" text-[#A37159] leading-0">
          <h1 style={{ fontFamily: "MyFont" }} className="sm:text-[70px] text-5xl leading-none">Medical Conditions</h1>
          <h1 style={{ fontFamily: "MyFontNavbar" }} className="sm:text-[45px] text-2xl leading-none">Managed by Parallel Clinic</h1>
        </div>
      </div>

      {/* Bottom Right Text */}
      <div className="absolute bottom-6 right-8 text-sm text-gray-700">
        <FaHeadphones size={50} className="text-[#DAA57B]" />
      </div>

      <div className="w-full absolute bottom-16 sm:bottom-8 left-0 flex flex-col items-center px-4 text-center leading-none">
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
          Managed With World Class Publications Documenting the Assurance of
        </h1>
        <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#A37159] sm:text-[30px]">
          Highly Safe & Highly Efficient Medicines*
        </h1>
      </div>
    </div>
  );
};

export default MedicalCondition;
