import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHeadphones } from "react-icons/fa6";

const AboutClinic2 = () => {
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
        <div className="relative w-full bg-[#FDF8E5] sm:min-h-[84vh] flex flex-col">

            {/* Cursor */}
            <div
                ref={cursorRef}
                className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999] pointer-events-none"
            />

            {/* Main Content */}
            <div className="w-[100vw]  flex flex-col items-center justify-center ">
                <div  className="text-[#A37159] flex items-start w-full pl-[10%]">
                    <h1 className="sm:text-[55px] text-[33px] leading-none">About <br className="block sm:hidden" /><span className="text-[#C5A184]">Parallel Clinic</span></h1>
                </div>
                <div className="w-[90vw]  flex flex-col items-center text-center">

                    <p className="mt-2 sm:text-[30px] text-[25px] text-[#A37159] font-light leading-relaxed">
                        Parallel Clinic offers Personalized, Molecular-Targeted,<br />
                        Precision Medicine using Natural Pharmaceutical Ingredients (NPIs).
                    </p>

                    <div className="flex items-center justify-center mt-2 sm:text-[30px] text-[20px] text-[#A37159] font-light text-center leading-snug">
                        <span className="sm:text-[80px] text-[150px] leading-none -mt-6">{'{'}</span>
                        <p className="mx-4 leading-snug">
                            Approximately 90% of all current medications are effective for <br />
                            only 30~50% of the patients who take them!
                        </p>
                        <span className="sm:text-[80px] text-[150px] leading-none -mt-6">{'}'}</span>
                    </div>


                    <div className="sm:mt-2 mt-4 text-[#A37159] leading-none">
                        <h3 style={{ fontFamily: "MyFont" }} className="text-[#A37159] text-[25px]">Parallel Clinic's therapeutic doctrine is founded on Physicians & Patients working in Parallel.</h3>
                        <div className="text-[17px] sm:-space-y-2  flex flex-col justify-center items-center w-full">
                            <p className="w-[90%] leading-0.5">
                                Our Molecular-Targeted approach is based on a deep understanding of the molecular pathophysiology of diseases that we treat
                            </p>
                            <p className="w-[90%] leading-0">
                                The NPIs used are selected based on their well-characterized constituents that target specific disease stages at molecular level
                            </p>
                            <p className="leading-0">
                                Safety and efficacy of these NPIs is well-documented in scientific journals of international repute and <br /> these Evidence-based medicines backed by decades of human use experience
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            {/* Bottom Text */}
            <div className="sm:fixed sm:bottom-0 sm:left-0 w-full  px-4 sm:px-0 flex flex-col items-center text-center space-y-0.5 z-50 mt-20 sm:mt-0">
                <h2 className="text-[#A37159] text-2xl sm:text-[40px] font-semibold">
                    Making Your Medicine Personal & Precise.  </h2>
                <h2 className="text-[#A37159] text-2xl sm:text-[25px] font-bold">
                    World Class Personalized Targeted Precision Medicine
                </h2>
                <h2 className="text-[#A37159] text-2xl sm:text-[25px] font-bold">
                    using Natural Pharmaceutical Ingredients
                </h2>
                <p className="text-[#676F75] text-base sm:text-[17px]">
                    Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
                </p>
                <p className="text-[#676F75] text-base sm:text-[17px]">
                    Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
                </p>
                <div className="absolute bottom-4 right-8 text-sm text-gray-700">
                <FaHeadphones size={50} className="text-[#DAA57B]" />
            </div>
            </div>

            {/* <div className="w-full py-10 px-4 sm:px-0 flex flex-col items-center text-center mt-10 space-y-2">
                <h1 style={{ fontFamily: "MyFont" }} className="text-[#A37159] text-2xl sm:text-4xl font-bold">
                    World Class - Protocols Based Medicine
                </h1>
                <p style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] text-base sm:text-[22px]">
                    Founded on a Clear Understanding of Molecular Basis of Pathophysiology of Medical Conditions
                </p>
                <p style={{ fontFamily: "MyFontNavbar" }} className="text-[#676F75] text-base sm:text-[22px]">
                    Using Botanical Medicines with Well Documented Molecular Level Mechanisms of Actions
                </p>
            </div> */}


            {/* Headphone Icon */}
           
        </div>
    )
}

export default AboutClinic2
