import React from "react";
import { Link } from "react-router-dom";
import { InView } from "react-intersection-observer";

const TurnkeyContractingServices = () => {
  const turnkeyServices = [
    {
      image: "/src/Images/TurnkeyContracting/residential.png",
      title: "Residential Projects",
      desc: "Building homes that reflect your unique style and aspirations.",
    },
    {
      image: "/src/Images/TurnkeyContracting/building.png",
      title: "Commercial Spaces",
      desc: "Crafting dynamic spaces tailored to your business needs.",
    },
    {
      image: "/src/Images/TurnkeyContracting/factory.png",
      title: "Industrial Facilities",
      desc: "Robust and efficient construction for your industrial endeavors.",
    },
    {
      image: "/src/Images/TurnkeyContracting/construction.png",
      title: "Renovations and Remodeling",
      desc: "Transforming spaces into masterpieces of form and function.",
    },
  ];

  return (
    <div className="bg-gray-50 pb-8">
      <header className="text-center mb-16">
        <h1 className="md:text-3xl text-xl font-extrabold text-silver bg-gradient-to-r from-cyan-500 to-blue-700 py-6">
          Experience Excellence with Our Turnkey Services
        </h1>
        <p className="md:text-base text-sm font-semibold text-darkblue mt-4">
          End-to-end solutions designed for seamless execution and exceptional
          quality.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:px-16 px-6">
        {turnkeyServices.map((service, index) => (
          <InView key={index} triggerOnce>
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={`bg-white rounded-lg shadow-lg hover:shadow-2xl py-2 transition-all duration-300 fade-scale ${
                  inView ? "animate-fade-scale" : "opacity-0"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="md:h-40 h-28 w-full object-contain rounded-t-lg"
                />
                <div className="p-6">
                  <h2 className="md:text-xl text-center text-md font-bold text-cyan-500">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 mt-3 font-semibold md:text-base text-xs">
                    {service.desc}
                  </p>
                  {/* View Project Button */}
                  <Link
                    to="/Projects"
                    onClick={() => window.scrollTo(0, 0)}
                    className="mt-4 inline-block md:text-base text-xs text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            )}
          </InView>
        ))}
      </div>
    </div>
  );
};

export default TurnkeyContractingServices;
