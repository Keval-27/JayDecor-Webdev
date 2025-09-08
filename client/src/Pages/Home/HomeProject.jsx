import React from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";

const HomeProject = () => {
  const ProjectCard = [
    {
      Title: "Full Home Interior",
      Info: "Elevate your home with beautiful, purposeful interior designs.",
      url: "/src/Images/OurMission.jpg",
    },
    {
      Title: "Modular Kitchen",
      Info: "Transform your kitchen with elegance and smart design.",
      url: "/src/Images/OurMission.jpg",
    },
    {
      Title: "Modular Furniture",
      Info: "Experience comfort and style with our modular, customizable furniture.",
      url: "/src/Images/OurMission.jpg",
    },
    {
      Title: "Furniture & Decor",
      Info: "Enhance your space with our stylish, durable furniture and decor.",
      url: "/src/Images/OurMission.jpg",
    },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <h1 className="text-5xl text-darkblue font-semibold flex items-center justify-center py-20 mt-[10px]">
        <span className="text-3xl p-5 mx-5  border-darkblue border-r-2">
          Projects
        </span>
        Personalize your space with design
      </h1>

      <div className="w-full flex flex-col md:gap-5 justify-between items-center">
        {ProjectCard.map((card, index) => (
          <div
            key={index}
            className="relative md:w-[300px] md:h-[400px] w-[250px] h-[300px]rounded-lg shadow-lg overflow-hidden bg-white transform transition-all duration-300"
          >
            {/* Image or main card content */}

            <div className="absolute inset-0 bg-cover bg-center">
              <img src={card.url} alt="" />
            </div>

            {/* Hidden info overlay */}
            <div className="absolute inset-0 bg-gray-800 bg-opacity-75 text-white flex flex-col justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-xl font-semibold mb-2">{card.Title}</h2>
              <p className="text-lg text-center px-4">{card.Info}</p>
              <div className="mt-4  text-5xl p-2 text-darkblue bg-silver opacity-70 cursor-pointer rounded-xl ">
                <MdOutlineDoubleArrow />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeProject;
