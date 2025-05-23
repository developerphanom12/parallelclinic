import React, { useEffect, useRef, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import gsap from "gsap";
import menuGif from "../assets/MainMenuRing.gif";
import { FaHeadphones } from "react-icons/fa6";
import { IoIosMusicalNote } from "react-icons/io";
import sound from "../assets/sound.gif";
import flower1 from "../assets/flower1.png"; // Replace with your actual image
import flower2 from "../assets/flower2.png"; // Replace with your actual image
import flower3 from "../assets/flower3.png"; // Replace with your actual image
import flower4 from "../assets/flower1.png"; // Replace with your actual image
import { useNavigate } from "react-router-dom";

const ChooseHope = () => {
    const cursorRef = useRef(null);
    const [showMenu, setShowMenu] = useState(false);
    const [invisibleIndex, setInvisibleIndex] = useState(null);
    const navigate = useNavigate();

    const images = [
        flower1,
        flower2,
        flower3,


    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const imageRefs = useRef([]);

    // Initial fade-in with GSAP (on mount)
    useEffect(() => {
        imageRefs.current.forEach((img, index) => {
            if (img) {
                gsap.set(img, { opacity: 0 });
                if (index === 0) {
                    gsap.to(img, { opacity: 1, duration: 9, ease: "power2.out" });
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
                duration: 6,
                ease: "power2.out",
            });

            setCurrentIndex(nextIndex);
        }, 30000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const menuItems = [
        { label: "About Parallel Clinic", path: "/about" },
        { label: "Medical Conditions", path: "/medicalconditions" },
        { label: "Join Parallel Clinic Team", path: "/joinparallelclinic" },
    ];

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
        <div className="relative w-full h-screen bg-[#FDF8E5] overflow-hidden">
            {/* Cursor */}
            <div
                ref={cursorRef}
                className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
            />


            <div className="absolute top-[5%] left-[50%] transform -translate-x-1/2 flex justify-center items-center">
                <div className="w-[120vw] h-[120vh] relative flex justify-center items-center">

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
                        className="absolute object-contain opacity-0 transition-opacity scale-75 w-[86vw] h-[100vh]"
                    />

                    <img
                        ref={(el) => (imageRefs.current[2] = el)}
                        src={flower3}
                        alt="flower3"
                        className="absolute object-contain opacity-0 transition-opacity scale-75 w-[100vw] h-[80vh]"
                    />

                    {/* <img
      ref={(el) => (imageRefs.current[3] = el)}
      src={flower4}
      alt="flower4"
      className="absolute object-contain opacity-0 transition-opacity scale-75 w-[450px] h-[450px]"
    /> */}

                </div>
            </div>



            {/* Navbar */}
            <nav className="w-full flex justify-between items-start px-8 py-4">
                <div className="flex sm:pl-16">
                    {/* <div className="bg-blue-400 w-16 h-16 mt-6" /> */}
                    <h1
                        style={{ fontFamily: "MyFont" }}
                        className="text-7xl w-[50%] text-[#C5A184] mt-18"
                    >
                        Choose Hope Renew Hope
                    </h1>
                </div>

                {/* Menu Icon + GIF */}
                <div
                    className="relative w-38 h-38 cursor-pointer"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <img
                        src={menuGif}
                        alt="sound gif"
                        className="w-full h-full object-cover rounded-full"
                    />
                    <IoIosMenu size={35} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-[#C5A184]" />
                </div>
            </nav>

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


            {/* Bottom Right Text */}
            <div className="absolute bottom-4 right-6 text-sm text-gray-700">
                <div className="flex flex-col gap-2 items-end mr-7">

                    <div style={{ fontFamily: "MyFont" }} className="sm:w-[38%]">
                        <h1 className="text-[#C5A184] text-[24px] text-end">With Well Documented
                            Assurance of Highly Safe,
                            Highly Efficient Medicines*</h1>
                    </div>
                    <FaHeadphones size={50} className="text-[#DAA57B]" />
                </div>
            </div>
        </div>
    );
}

export default ChooseHope
