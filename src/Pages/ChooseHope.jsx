import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import menuGif from "../assets/MainMenuRing.gif";
import { FaHeadphones } from "react-icons/fa6";
import flower1 from "../assets/flower1.png";
import flower2 from "../assets/flower2.png";
import flower3 from "../assets/flower3.png";
import { useNavigate } from "react-router-dom";
import waveStop from "../assets/waveStop.gif";
import wavePlaying from "../assets/wavePlaying.gif";
import sampleAudio from "../assets/audio.wav";

const ChooseHope = () => {
  const cursorRef = useRef(null);
  const [invisibleIndex, setInvisibleIndex] = useState(null);
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [showSlider, setShowSlider] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [waveImage, setWaveImage] = useState(waveStop); // <-- Track current wave gif

  const images = [flower1, flower2, flower3];

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
  const handleHeadphoneClick = () => {
    setShowSlider(!showSlider);
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = volume;
      audio.play();
      setWaveImage(wavePlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

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
    }, 10000);

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
    <div className="relative w-full h-full sm:h-[84vh] bg-[#FDF8E5] overflow-hidden">
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="w-12 h-12 border border-[#C5A184] rounded-full fixed top-0 left-0 z-[999]"
      />

      {/* Page Title */}
      <div className="w-full flex justify-between items-start px-8 py-4">
        <div className="flex sm:pl-16">
          <h1
            style={{ fontFamily: "MyFont" }}
            className="sm:text-7xl text-5xl sm:w-[50%] w-[90%] text-[#C5A184]"
          >
            Choose Hope. Renew Hope.
          </h1>
        </div>
      </div>

      {/* Flower Images */}
      <div className="absolute top-[3%] left-[50%] transform -translate-x-1/2 flex justify-center items-center">
        <div className="w-[100vw] h-[80vh] relative flex justify-bottom items-center">
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
        </div>
      </div>

      {/* Consult Doctors Text - Left Bottom */}
      <div className="absolute bottom-10 left-6 sm:left-16 text-[#A37159]">
        <h2 style={{ fontFamily: "MyFont" }} className="text-1xl sm:text-3xl">
          Consult Parallel Clinic Doctors
          <br />
          Without Leaving Your House
        </h2>
      </div>

      {/* Bottom Right Text */}
      <div className="absolute sm:bottom-8 bottom-5 sm:right-6 right-6 text-sm text-gray-700">
        <div className="flex flex-col gap-2 items-end mr-7">
          <div style={{ fontFamily: "MyFont" }} className="sm:w-[38%]">
            <h1 className="text-[#C5A184] sm:text-[24px]  text-[20px] sm:text-start text-center">
              With Well Documented Science Based Assurance of Highly Safe,
              Highly Efficient Medicines*
            </h1>
          </div>
          {/* <FaHeadphones size={50} className="text-[#DAA57B]" /> */}
          <div
            onClick={handleHeadphoneClick}
            className="relative w-fit cursor-pointer"
          >
            <FaHeadphones
              size={100}
              className="text-[#DAA57B] cursor-pointer"
            />
            <img src={waveImage} alt="wave" className="absolute bottom-0 " />
          </div>

          {showSlider && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute bottom-40 sm:-right-4 -right-8 rotate-[-90deg] w-32 appearance-none custom-slider z-0"
            />
          )}

          <audio ref={audioRef} src={sampleAudio} loop />
        </div>
      </div>
    </div>
  );
};

export default ChooseHope;
