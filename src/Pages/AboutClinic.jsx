

// export default AboutClinic;
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import NewPlayerGlobal from "../components/NewPlayerGlobal";
import AboutLogo from "../assets/AboutLogo.png";
import AboutLogo2 from "../assets/AboutBrown.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";


const AboutClinic = () => {
 const navigate = useNavigate()
  const [currentLogo, setCurrentLogo] = useState(AboutLogo);

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentLogo(prev => (prev === AboutLogo ? AboutLogo2 : AboutLogo));
      }, 800);

      return () => clearInterval(interval); // Clean up on unmount
    }, []);

  return (
    <div className="relative w-full bg-[#FDF8E5] min-h-[84vh] flex flex-col overflow-hidden">
      {/* Cursor */}
      {/* <div
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999] pointer-events-none"
      /> */}
      <div className="sm:h-[60v] lg:h-[70vh] lg:overflow-y-hidden pb-10 hide-scrollbar relative">
      <div style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] flex justify-center items-center w-full mb-4 ">
        <h1 className="sm:text-[48px] text-[33px] leading-none">About <span className="text-[#C5A184]">Parallel Clinic</span></h1>
      </div>

        {/* Top Section from AboutClinic2 */}
        <div className="w-[100vw] flex flex-col items-center justify-center">

          <div className="w-[90vw] flex flex-col items-center text-center sm:mb-20">
            <p style={{ fontFamily: "libre bodoni" }} className="sm:text-[28px] text-[25px] sm:mb-2 text-[#A37159] font-light leading-relaxed">
              Parallel Clinic offers Personalized, Molecular-Targeted,<br />
              Precision Medicine using Natural Pharmaceutical Ingredients (NPIs).
            </p>

            <div style={{ fontFamily: "libre bodoni" }} className="flex items-center justify-center mt-1 sm:mb-2 sm:text-[26px] text-[20px] text-[#A37159] font-light text-center leading-snug">
              <span className="lg:text-[80px] sm:text-[120px] text-[150px] leading-none -mt-2">{'{'}</span>
              <p className="mx-4 leading-snug italic ">
                Approximately 90% of all current medications are effective for <br />
                only 30~50% of the patients who take them!
              </p>
              <span className="lg:text-[80px] sm:text-[120px] text-[150px] leading-none -mt-2">{'}'}</span>
            </div>

            <div className="sm:mt-2 mt-4 text-[#A37159] leading-none">
              <h3 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-[25px] lg:mb-0 mb-4">Parallel Clinic's therapeutic doctrine is founded on Physicians & Patients working in Parallel.</h3>
              <div style={{ fontFamily: "roboto flex" }}  className="text-[17px] lg:space-y-0.5  flex flex-col justify-center items-center w-full">
                <p className="w-[100%] leading-0.5">
                  Our Molecular-Targeted approach is based on a deep understanding of the molecular pathophysiology of diseases that we treat
                </p>
                <p className="w-[100%] leading-0">
                  The NPIs used are selected based on their well-characterized constituents that target specific disease stages at molecular level
                </p>
                <p className="leading-0">
                  Safety and efficacy of these NPIs is well-documented in scientific journals of international repute and <br /> these Evidence-based medicines backed by decades of human use experience
                </p>
              </div>
            </div>

            <div onClick={()=>navigate("/about2")} className="text-[#A37159] flex justify-self-center sm:items-center items-start sm:mt-4 mt-6 cursor-pointer ">
              {/* <img src={currentLogo} className="w-8 h-8 sm:mr-4 " alt="About Logo" /> */}
              <h2 style={{ fontFamily: "libre bodoni" }} className=" text-[#406587] text-2xl sm:text-[28px] font-bold sm:pt-2 mr-2">Information Hub: Your Questions. Our Answers. FAQs.</h2>
              {/* <img src={currentLogo} className="w-8 h-8 sm:mr-4 " alt="About Logo" /> */}
              <FaArrowRight className="text-[#406587] " size={28} />
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Text */}
      {/* <div className="sm:fixed relative sm:bottom-0 sm:left-0 w-full px-4 sm:px-0 flex flex-col items-center text-center mt-10 pb-20 sm:pb-0 sm:mb-0 sm:mt-0 bg-[#FDF8E5] ">
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[28px] font-semibold leading-tight mt-2">
          Making Your Medicine Personal & Precise.
        </h2>
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-2xl sm:text-[24px] sm:w-[60%] lg:w-full font-bold leading-tight">
          World Class Personalized Targeted Precision Medicine using Natural Pharmaceutical Ingredients
        </h2>
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[18px] leading-tight sm:w-[60%] lg:w-full">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
        </p>
        <p style={{ fontFamily: "roboto flex" }}  className="text-[#676F75] text-base sm:text-[18px] leading-tight sm:w-[60%] lg:w-full">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
        </p>
        <div className="absolute sm:bottom-4 bottom-0 right-8 text-sm text-gray-700">
          <FaHeadphones size={50} className="text-[#DAA57B]" />
          <NewPlayerGlobal />
        </div>
      </div> */}
      <div className="lg:fixed relative lg:bottom-0 sm:left-0 w-full px-4 lg:px-0 flex flex-col items-center text-center mt-10 sm:pb-0 sm:mb-0 sm:mt-0 bg-[#FDF8E5] ">
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-[20px] sm:text-[28px] font-semibold leading-tight mt-2">
          Making Your Medicine Personal & Precise.
        </h2>
        <h2 style={{ fontFamily: "libre bodoni" }} className="text-[#A37159] text-[18px] sm:text-[24px] sm:w-[100%] font-bold leading-tight">
          World Class Personalized Targeted Precision Medicine using Natural Pharmaceutical Ingredients
        </h2>
        <p style={{ fontFamily: "roboto flex" }} className="text-[#676F75] text-base sm:text-[18px] leading-tight sm:w-[60%] lg:w-full">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
        </p>
        <p style={{ fontFamily: "roboto flex" }}  className="text-[#676F75] text-base sm:text-[18px] leading-tight sm:w-[60%] lg:w-full">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
        </p>
      </div>
    </div>
  );
};

export default AboutClinic;

