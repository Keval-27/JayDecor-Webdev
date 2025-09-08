import React, { useState, useEffect } from "react";

const Intro = () => {
  const BackgroundImages = [
    "/src/Images/Intro-BG1.jpg",
    "/src/Images/Intro-BG2.jpg",
    "/src/Images/JDstudioDesigns/livingroom5/IMG-20241208-WA0032.jpg",
    "/src/Images/JDstudioDesigns/livingroom6/IMG-20241208-WA0038.jpg",
    "/src/Images/JDstudioDesigns/livingroom7/IMG-20241208-WA0046.jpg",
    "/src/Images/JDstudioDesigns/kitchen3/IMG-20241208-WA0054.jpg",
    "/src/Images/JDstudioDesigns/bedroom3/IMG-20241208-WA0030.jpg"
  ];

  // State to keep track of the current background index
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Change the background every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % BackgroundImages.length);
    }, 4000);
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex flex-col justify-center text-center bg-center bg-cover w-full md:h-screen h-[500px] transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: `url(${BackgroundImages[currentIndex]})`,
      }}
    >
      {/* Dark Overlay using ::before */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-darkblue font-semibold animate-glow">
        <h1 className="md:text-5xl text-3xl font-bold mb-2 animate-zoom-blur ">
          Studio Jay Decor
        </h1>
        <h3 className="md:m-10 md:text-3xl text-xl font-bold animate-zoom-blur">
          We Design Your Dreams
        </h3>
      </div>
    </div>
  );
};

export default Intro;
