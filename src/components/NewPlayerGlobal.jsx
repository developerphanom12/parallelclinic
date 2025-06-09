import React, { useRef, useState } from 'react'
import { FaHeadphones } from "react-icons/fa6";
import waveStop from "../assets/waveStop.gif";
import wavePlaying from "../assets/wavePlaying.gif";
import sampleAudio from "../assets/audio.wav";


const NewPlayerGlobal = () => {
  const audioRef = useRef(null);
  const [showSlider, setShowSlider] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [waveImage, setWaveImage] = useState(waveStop); // <-- Track current wave gif

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
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

  return (
    <div>
      <div
        onClick={handleHeadphoneClick}
        className="relative w-fit cursor-pointer"
      >
        <FaHeadphones
          // size={60}
          className="text-[#DAA57B] cursor-pointer w-15 h-15 sm:w-20 sm:h-20"
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
  )
}

export default NewPlayerGlobal
