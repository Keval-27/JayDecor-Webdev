import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";

const InteriorServices = () => {
  const ProjectCard = [
    {
      Title: "Full Home Interior",
      Info: "Elevate your home with beautiful, purposeful interior designs.",
      url: "/src/Images/bed.jpeg",
    },
    {
      Title: "Modular Kitchen",
      Info: "Transform your kitchen with elegance and smart design.",
      url: "/src/Images/About/OurMission.jpg",
    },
    {
      Title: "Modular Furniture",
      Info: "Experience comfort and style with our modular, customizable furniture.",
      url: "/src/Images/About/WelcomeJD.jpg",
    },
    {
      Title: "Furniture & Decor",
      Info: "Enhance your space with our stylish, durable furniture and decor.",
      url: "/src/Images/Intro-BG2.jpg",
    },
  ];

  return (
    <section className="h-auto md:py-9 py-7 bg-gray-100 ">

      {/* Section title   */}

      <h1 className=" sm:text-2xl md:text-4xl text-xl  text-darkblue font-bold text-center sm:py-16 py-8 px-9 mt-[5px]">
        {/*<span className="md:text-2xl text-xl md:p-5 p-3 mx-5  border-darkblue border-r-2">
          Projects
        </span>*/}  
        Personalize your space with design
      </h1>
      {/* projects Cards*/}

      <div className="flex items-center justify-center ">
        <div className="grid lg:grid-cols-4 md:grid-cols-3  grid-cols-2 md:gap-5 gap-3 justify-center items-center">
          {ProjectCard.map((card, index) => (
            <div
              key={index}
              className="relative lg:w-[300px] lg:h-[400px] sm:w-[250px] sm:h-[300px] w-[150px] h-[200px] rounded-lg 
            shadow-lg overflow-hidden bg-white transform transition-all duration-300"
            >
              {/* Image or main card content */}

              <div className="absolute inset-0 bg-cover bg-center">
                <img src={card.url} alt="" className="  sm:w-[250px] sm:h-[300px] md:w-[300px] md:h-[400px] w-[150px] h-[200px]"/>
              </div>

              {/* Hidden info overlay */}

              <div className="absolute inset-0 bg-gray-800 bg-opacity-75 text-white flex flex-col justify-center 
              items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h2 className="md:text-xl text-sm font-bold mb-2">{card.Title}</h2>
                <p className="md:text-xl text-xs text-center px-4">{card.Info}</p>
                
                {/*Projects button <MdOutlineDoubleArrow className="mt-4  text-5xl p-2 text-darkblue bg-silver opacity-70 cursor-pointer rounded-xl " />*/}

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteriorServices;
