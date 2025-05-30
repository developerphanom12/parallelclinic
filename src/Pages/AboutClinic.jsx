
// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { FaHeadphones } from "react-icons/fa6";

// const AboutClinic = () => {
//   const cursorRef = useRef(null);

//   // Mouse follower
//   useEffect(() => {
//     const cursor = cursorRef.current;

//     const moveCircle = (e) => {
//       gsap.to(cursor, {
//         x: e.clientX,
//         y: e.clientY,
//         scale: 1,
//         opacity: 1,
//         duration: 0.8,
//         ease: "power2.out",
//       });
//     };

//     const checkMouseLeaveDocument = (e) => {
//       if (!e.relatedTarget && !e.toElement) {
//         gsap.to(cursor, {
//           scale: 0,
//           opacity: 0,
//           duration: 0.5,
//         });
//       }
//     };

//     window.addEventListener("mousemove", moveCircle);
//     document.addEventListener("mouseout", checkMouseLeaveDocument);

//     return () => {
//       document.removeEventListener("mouseout", checkMouseLeaveDocument);
//       window.removeEventListener("mousemove", moveCircle);
//     };
//   }, []);

//   return (
//     <div className="relative w-full bg-[#FDF8E5] overflow-hidden h-full">
//       {/* Cursor */}
//       <div
//         ref={cursorRef}
//         className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
//       />
      
//       <div className="flex flex-row w-full h-full">
//         {/* Left Content */}
//         <div className="flex flex-col sm:pl-16 px-8 sm:py-4 sm:w-[40%]">
//           {/* Heading */}
//           <div style={{ fontFamily: "MyFont" }} className="text-[#A37159] leading-0">
//             <h1 className="sm:text-[70px] text-5xl leading-none">About</h1>
//             <h1 className="sm:text-[70px] text-5xl leading-none">Parallel Clinic</h1>
//           </div>

//           {/* Paragraph */}
//           <p className="mt-4 text-[20px] text-[#848688] leading-tight">
//             Parallel Clinic is an entirely online clinic offering<br />
//             Personalized Medicine using Active Botanical<br />
//             Ingredients.<br />
//             Parallel Clinic takes a parallel approach to<br />
//             healing: Patients may combine conventional<br />
//             medicine alongside highly safe yet non-mainstream,<br />
//             cutting-edge treatments.
//           </p>
          
//           {/* Circle Icon */}
//           <div className="mt-8 w-24 h-24 rounded-full bg-[#C5A184] flex items-center justify-center">
//             <span className="text-white text-5xl font-light">i</span>
//           </div>
//         </div> 
        
//         {/* Right Content - FAQ */}   
//         <div className="hidden sm:flex flex-col sm:w-[50%] px-8 py-4 text-[#5C8A8A] text-[18px] mt-[20px]">
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">What is special about Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">What is the process of consultation</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">What kind of medicines are used by Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">What is the regulatory status of medicines used by Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">What is molecular medicine</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Are there steroids in the medicines used by Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Can I get these medicines available in the market</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Will I continue to take medicines prescribed by other specialists</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">How fast can I expect the treatment to work</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Can I tell my Doctor about taking treatment from Parallel Clinic also</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Can someone else attend the Parallel Clinic doctor on behalf of the patient</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">How safe will be my personal information that I share with Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">I need this treatment but cannot afford it</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">I'm impressed. How do I begin consulting a doctor at Parallel Clinic</p>
//           <p className="mb-2 hover:text-[#A37159] cursor-pointer">Get in Touch</p>
//         </div>
//       </div>

//       {/* Bottom Right Text */}
//       <div className="absolute bottom-6 right-8 text-sm text-gray-700">
//         <FaHeadphones size={50} className="text-[#DAA57B]" />
//       </div>

//       <div className="w-full absolute bottom-16 sm:bottom-8 left-0 flex flex-col items-center px-4 text-center leading-none">
//         <h1 style={{ fontFamily: "MyFont" }} className="text-[#A37159] sm:text-4xl text-xl font-bold">
//           World Class - Protocols Based Medicine
//         </h1>
//         <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
//           Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
//         </h1>
//         <h1 style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] sm:text-[30px]">
//           Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default AboutClinic;
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
    <div className="relative w-full bg-[#FDF8E5] min-h-[84vh] flex flex-col">
 
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999] pointer-events-none"
      />
 
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row w-full px-6 sm:px-16 pt-10 gap-8 flex-grow">
 
        {/* Left */}
        <div className="lg:w-[40%] flex flex-col">
          <div style={{ fontFamily: "MyFont" }} className="text-[#A37159]">
            <h1 className="sm:text-[70px] text-5xl leading-none">About</h1>
            <h1 className="sm:text-[70px] text-5xl leading-none">Parallel Clinic</h1>
          </div>
 
          <p className="mt-4 text-[18px] text-[#848688] leading-relaxed">
            Parallel Clinic is an entirely online clinic offering<br />
            Personalized Medicine using Active Botanical Ingredients.<br />
            It takes a parallel approach to healing—combining conventional medicine with highly safe yet non-mainstream, cutting-edge treatments.
          </p>
 
          <div className="mt-8 w-24 h-24 rounded-full bg-[#C5A184] flex items-center justify-center">
            <span className="text-white text-5xl font-light">i</span>
          </div>
        </div>
 
        {/* Right (FAQ) */}
        <div className="lg:w-[60%] mt-6 lg:mt-0 text-[#5C8A8A] text-[18px] space-y-2">
          {[
            "What is special about Parallel Clinic",
            "What is the process of consultation",
            "What kind of medicines are used by Parallel Clinic",
            "What is the regulatory status of medicines used by Parallel Clinic",
            "What is molecular medicine",
            "Are there steroids in the medicines used by Parallel Clinic",
            "Can I get these medicines available in the market",
            "Will I continue to take medicines prescribed by other specialists",
            "How fast can I expect the treatment to work",
            "Can I tell my Doctor about taking treatment from Parallel Clinic also",
            "Can someone else attend the Parallel Clinic doctor on behalf of the patient",
            "How safe will be my personal information that I share with Parallel Clinic",
            "I need this treatment but cannot afford it",
            "I'm impressed. How do I begin consulting a doctor at Parallel Clinic",
            "Get in Touch",
          ].map((item, i) => (
            <p key={i} className="hover:text-[#A37159] cursor-pointer">{item}</p>
          ))}
        </div>
      </div>
 
      {/* Bottom Text */}
      <div className="w-full py-10 px-4 sm:px-0 flex flex-col items-center text-center mt-10 space-y-2">
        <h1 style={{ fontFamily: "MyFont" }} className="text-[#A37159] text-2xl sm:text-4xl font-bold">
          World Class - Protocols Based Medicine
        </h1>
        <p style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] text-base sm:text-[22px]">
          Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
        </p>
        <p style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] text-base sm:text-[22px]">
          Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
        </p>
      </div>
 
      {/* Headphone Icon */}
      <div className="absolute bottom-6 right-8 text-sm text-gray-700">
        <FaHeadphones size={50} className="text-[#DAA57B]" />
      </div>
    </div>
  );
};
 
export default AboutClinic;
 
 