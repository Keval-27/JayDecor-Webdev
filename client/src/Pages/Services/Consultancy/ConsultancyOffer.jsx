import React, { useState } from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer";

const ConsultancyOffer = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const Service = [
    {
      title: "Initial Consultation & Needs Assessment",
      description:
        "We assess your needs and vision, helping define the scope and goals of your project.",
      outcome: "Outcome: Clear understanding of your project scope and preferences.",
      image: "/src/Images/Consultancy/service1.jpg", // Add your image URL here
    },
    {
      title: "Space Planning & Layout Design",
      description:
        "We optimize your space layout for better flow and functionality.",
      outcome: "Outcome: A well-planned, functional space layout.",
      image: "/src/Images/Consultancy/service2.jpg", // Add your image URL here
    },
    {
      title: "Concept Design & Mood Boards",
      description:
        "We create mood boards to visualize your design direction with colors and materials.",
      outcome: "Outcome: A visual guide to your design style and direction.",
      image: "/src/Images/Consultancy/service3.jpg", // Add your image URL here
    },
    {
      title: "Material & Product Selection",
      description:
        "We help you choose the right materials, furniture, and decor for your space.",
      outcome: "Outcome: Carefully selected materials and products.",
      image: "/src/Images/Consultancy/service4.jpg", // Add your image URL here
    },
    {
      title: "Project Coordination & Vendor Management",
      description:
        "We coordinate contractors and manage installations to ensure a smooth process.",
      outcome: "Outcome: Efficient project execution with minimal hassle.",
      image: "/src/Images/Consultancy/service5.jpg", // Add your image URL here
    },
    {
      title: "Final Styling & Installation",
      description:
        "We complete the styling and installation, ensuring your space is ready to enjoy.",
      outcome: "Outcome: A beautifully styled, functional space.",
      image: "/src/Images/Consultancy/service6.jpg", // Add your image URL here
    },
  ];

  const handleToggleDescription = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 relative">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-cyan-400 to-blue-800 text-white md:py-8 py-4 text-center">
        <h1 className="md:text-3xl text-xl font-extrabold">
          Tailored Services to Bring Your Vision to Life
        </h1>
      </header>

      {/* Our Services Section */}
      <section className="container mx-auto md:px-6 px-4 py-12 text-center space-y-12 border-b-8 border-cyan-900">
        <h2 className="md:text-3xl text-xl font-bold text-darkblue">Our Services Include</h2>

        {/* Services Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-12 gap-6">
          {Service.map((service, index) => (
            <InView key={index} triggerOnce>
              {({ inView, ref }) => (
                <motion.div
                  ref={ref}
                  className={`bg-white md:p-6 p-2 shadow-lg rounded-xl transition duration-300 transform ${
                    activeIndex === index ? "scale-105" : "scale-100"
                  }`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {/* Image on top of the card */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full md:h-48 h-40 object-contain rounded-lg mb-4"
                  />

                  {/* Title */}
                  <h3 className="md:text-xl text-base font-extrabold text-cyan-500 mb-4">{service.title}</h3>

                  {/* Show More / Show Less Button */}
                  <div>
                    <button
                      onClick={() => handleToggleDescription(index)}
                      className="text-cyan-800 md:text-lg text-sm hover:border-b-2 hover:border-cyan-800 font-semibold"
                    >
                      {activeIndex === index ? "Show Less" : "Show More"}
                    </button>

                    {/* Description & Outcome */}
                    {activeIndex === index && (
                      <div className="mt-4">
                        <p className="md:text-base text-xs text-darkblue font-normal mb-4">
                          {service.description}
                        </p>
                        <p className="md:text-base text-xs text-darkblue font-semibold">
                          {service.outcome}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </InView>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsultancyOffer;
