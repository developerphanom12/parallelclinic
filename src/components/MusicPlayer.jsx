import React, { useRef, useState } from "react";
import { IoIosMusicalNote } from "react-icons/io";
import { FaHeadphones } from "react-icons/fa6";
import sampleAudio from "../assets/audio.wav";
import waveStop from "../assets/waveStop.gif";
import wavePlaying from "../assets/wavePlaying.gif";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const [showSlider, setShowSlider] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [waveImage, setWaveImage] = useState(waveStop); // <-- Track current wave gif

  const handleTextClick = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.currentTime = 0;
      audio.play();
      setWaveImage(wavePlaying);
    }
  };

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

  return (
    <div className="absolute bottom-4 right-6 text-sm text-gray-700 z-9">
      <div className="flex gap-2 items-end relative">
        <div
          onClick={handleTextClick}
          style={{ fontFamily: "MyFontNavbar" }}
          className="leading-none mb-5 text-end cursor-pointer"
        >
          <h1 className="text-[#DAA57B] text-[18px] sm:text-[23px] flex items-center  sm:items-center sm:justify-end gap-1 justify-start ">
            <IoIosMusicalNote size={45} className="text-[#DAA57B] mt-5" />
            Start With Adding Some Sound
          </h1>
          <h1 className="text-[14px] sm:text-[12px]">
            Click to Create a Healthy & Immersive Aura
          </h1>
        </div>

        {/* <FaHeadphones
          size={80}
          className="text-[#DAA57B] cursor-pointer"
          onClick={handleHeadphoneClick}
        /> */}
        <div
          onClick={handleHeadphoneClick}
          className="relative w-fit cursor-pointer"
        >
          <FaHeadphones className="text-[#DAA57B] cursor-pointer text-[80px] sm:text-7xl md:text-[90px]" />
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
  );
};

export default MusicPlayer;
