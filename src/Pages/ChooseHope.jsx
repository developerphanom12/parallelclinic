import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import flower1 from "../assets/2.png";
import flower2 from "../assets/1.png";
import flower3 from "../assets/3.png";
import flower4 from "../assets/4.png";
import flower5 from "../assets/5.png";
import { useNavigate } from "react-router-dom";
import NewPlayerGlobal from "../components/NewPlayerGlobal";
 
const ChooseHope = () => {
  const cursorRef = useRef(null);
  const [invisibleIndex, setInvisibleIndex] = useState(null);
  const navigate = useNavigate();
  const images = [flower1, flower2, flower3 , flower4, flower5];
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRefs = useRef([]);
 
  // Initial fade-in with GSAP (on mount)
  useEffect(() => {
    imageRefs.current.forEach((img, index) => {
      if (img) {
        gsap.set(img, { opacity: 0 });
        if (index === 0) {
          gsap.to(img, { opacity: 1, duration: 2, ease: "power2.out" });
        }
      }
    });
  }, []);
 
  // Auto transition every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
 
      // Fade out current, fade in next
      gsap.to(imageRefs.current[currentIndex], {
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });
      gsap.to(imageRefs.current[nextIndex], {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });
 
      setCurrentIndex(nextIndex);
    }, 30000);
 
    return () => clearInterval(interval);
  }, [currentIndex]);
 
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
    <div className="relative w-full h-full sm:h-[90vh] bg-[#FDF8E5] overflow-y-hidden ">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />
 
      {/* Page Title */}
      <div className="w-full flex justify-between items-start px-8 py-4">
        <div className="flex sm:pl-8">
          <h1
            style={{ fontFamily: "MyFont" }}
            className="sm:text-[55px] text-[33px] sm:w-[50%] text-[#C5A184]"
          >
            Choose Hope. <br className="block sm:hidden" /> Renew Hope.
          </h1>
        </div>
      </div>
 
      {/* Flower Images */}
      <div className="absolute sm:top-[25%] top-[30%] left-[50%] transform -translate-x-1/2 flex justify-center items-center">
        <div className="w-[300px] h-[200px] sm:w-[480px] sm:h-[380px] relative flex justify-bottom items-center">
          <img
            ref={(el) => (imageRefs.current[0] = el)}
            src={flower1}
            alt="flower1"
            className="absolute object-contain opacity-0 transition-opacity scale-75 w-[100vw] h-[100vh]"
          />
 
          <img
            ref={(el) => (imageRefs.current[1] = el)}
            src={flower2}
            alt="flower2"
            className="absolute  opacity-0 transition-opacity scale-75 w-[100vw] h-[100vh]"
          />
 
          <img
            ref={(el) => (imageRefs.current[2] = el)}
            src={flower3}
            alt="flower3"
            className="absolute object-contain opacity-0 transition-opacity scale-75 w-[100vw] h-[100vh]"
          />
          <img
            ref={(el) => (imageRefs.current[3] = el)}
            src={flower4}
            alt="flower4"
            className="absolute object-contain opacity-0 transition-opacity scale-75 w-[100vw] h-[100vh]"
          />
          <img
            ref={(el) => (imageRefs.current[4] = el)}
            src={flower5}
            alt="flower5"
            className="absolute object-contain opacity-0 transition-opacity scale-75 w-[100vw] h-[100vh]"
          />
        </div>
      </div>
 
      {/* Consult Doctors Text - Left Bottom */}
      <div className="absolute bottom-2 sm:bottom-10 left-6 sm:left-16 text-[#A37159] ">
        <h2 style={{ fontFamily: "MyFont" }} className="text-1xl sm:text-3xl">
          Consult Parallel Clinic Doctors
          <br />
          Without Leaving Your House
        </h2>
      </div>
 
      {/* Bottom Right Text */}
      <div className="absolute sm:bottom-8 bottom-5 sm:right-6 right-6 text-sm text-gray-700">
        <div className="flex flex-col sm:flex-row gap-2 items-end mr-7">
          <div style={{ fontFamily: "MyFont" }} className="sm:w-[]">
            <h1 className="text-[#C5A184] sm:text-[20px]  text-[20px] sm:text-end text-center">
              With Well Documented <br/> Science Based Assurance of <br/>Highly Safe,Highly Efficient Medicines*
            </h1>
          </div>
          {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}
         <NewPlayerGlobal/>
        </div>
      </div>
    </div>
  );
};
 
export default ChooseHope;
 