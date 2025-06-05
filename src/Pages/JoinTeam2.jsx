import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";

const JoinTeam2 = () => {
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
    <div className="relative w-full bg-[#FDF8E5] sm:overflow-hidden sm:h-full">
         {/* Cursor */}
         <div
           ref={cursorRef}
           className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
         />
             {/* Heading */}
             <div className="text-[#A37159] mb-6 pl-[5%] w-[80%]">
               <h1 className="sm:text-[55px] text-[33px] leading-none">Join <span className="text-[#C5A184]">Parallel Clinic Team</span></h1>
             </div>
         
         {/* Bottom Text */}
         <div className="fixed bottom-0 left-0 w-full px-4 sm:px-0 flex flex-col items-center text-center space-y-0.5 z-50 mt-20 sm:mt-0 ">
            <p className="text-[#676F75] text-base sm:text-[17px]">
             Managed With Therapies Evidenced In Prestigious International Publications
           </p>
           <p className="text-[#bf9362] text-base sm:text-[17px]">
             Providing Assurance of Highly Safe, Highly Efficient Medicines
           </p>
           <h2 className="text-[#A37159] text-2xl sm:text-[25px] font-semibold">
             Practice World Class - Protocol Based Medicine
           </h2>
           <p className="text-[#676F75] text-base sm:text-[17px]">
             Founded on a Deep Understanding of Molecular Basis of Pathophysiology of Medical Conditions
           </p>
           <p className="text-[#676F75] text-base sm:text-[17px]">
             Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
           </p>
        <div className="absolute bottom-4 right-8 text-sm text-gray-700">
                <FaHeadphones size={50} className="text-[#DAA57B]" />
              </div>
         </div>
   
         {/* Bottom Right Text */}
      
       </div>
  )
}

export default JoinTeam2
