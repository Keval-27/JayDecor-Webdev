import React from "react";

const Page_Intro = ({ title, imageUrl }) => {
  return (
    <div className="relative md:h-[700px] h-[500px] overflow-hidden">
      {/* Background Image with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1500 ease-in-out hover:scale-125"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content with Animation */}
      <div className="relative z-10 flex items-center justify-center h-full text-darkblue animate-fade-in-up">
        <h1 className="p-3 rounded-xl text-center bg-gray-300 bg-opacity-50 md:text-3xl text-xl font-extrabold  animate-bounce-in">
          {title}
        </h1>
      </div>

     
    </div>
  );
};

export default Page_Intro;
