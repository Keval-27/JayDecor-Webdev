import React from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
const StudioGallery = () => {
  const cardsData = [
    { id: 1, imageSrc: "/src/Images/JDstudioDesigns/IMG-20241208-WA0080.jpg", title: "Kids Room" },
    { id: 2, imageSrc: "/src/Images/JDstudioDesigns/kitchen1/IMG-20241208-WA0002.jpg", title: "Kitchen" },
    {
      id: 3,
      imageSrc: "/src/Images/About/OurMission.jpg",
      title: "Living Room",
    },
    { id: 4, imageSrc: "/src/Images/JDstudioDesigns/dining2/IMG-20241208-WA0143.jpg", title: "Dining Room" },
    { id: 5, imageSrc: "/src/Images/JDstudioDesigns/bathroom1/IMG-20241208-WA0020.jpg", title: "Bathroom" },
    { id: 6, imageSrc: "/src/Images/Intro-BG1.jpg", title: "Master Bedroom" },
    { id: 7, imageSrc: "/src/Images/JDstudioDesigns/wardrobe1/IMG-20241208-WA0217.jpg", title: "Wardrobe" },
    { id: 8, imageSrc: "/src/Images/JDstudioDesigns/bedroom3/IMG-20241208-WA0030.jpg", title: "Bedroom" },
    
  ];

  return (
    <section className="py-10 container mx-auto px-2 md:px-16 lg:px-32">
      {/* Title Section */}
      <div className=" flex md:justify-start justify-center items-center md:px-4  py-5 ">
        <h1 className=" text-darkblue md:text-4xl text-xl font-bold capitalize  font-primary animate-slide-Right ">
          Ideas to transform your home
        </h1>
      </div>
      <div className="container mx-auto md:p-6">
        {/* Masonry Layout using columns */}
        <div className="columns-2 md:columns-3 md:gap-4 font-secondary">
          {cardsData.map((image) => (
            <div
              key={image.id}
              className="md:mb-4 mb-1 rounded-lg overflow-hidden relative group"
            >
              <a href="/DesignGallery">
              <img
                src={image.imageSrc}
                alt={image.title}
                className="w-full h-auto  rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              </a>
             
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white font-semibold px-2 py-1 rounded">
                <h2 className="text-white text-[10px] md:text-[15px]  font-semibold cursor-pointer">
                  {image.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center pt-6">
        <button
          className=" flex justify-center items-center space-x-2 md:text-lg text-[10px] font-semibold capitalize
       hover:bg-[#1560BD] bg-darkblue text-silver px-2 py-1   rounded-md cursor-pointer"
        >
          <a href="/Projects">Know More </a>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </section>
  );
};

export default StudioGallery;
