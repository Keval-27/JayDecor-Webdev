import React from "react";
import { useInView } from "react-intersection-observer"; // Import the useInView hook

const OurVision = () => {
  const reasons = [
    { url: "/src/Images/Home/OurVision/brainstorming.png", title: "Creativity" },
    { url: "/src/Images/Home/OurVision/functional.png", title: "Functionality" },
    { url: "/src/Images/Home/OurVision/sustainability.png", title: "Sustainability" },
    { url: "/src/Images/Home/OurVision/detail.png", title: "Attention to Detail" },
    { url: "/src/Images/Home/OurVision/handcraft.png", title: "Quality Craftsmanship" },
    { url: "/src/Images/Home/OurVision/adaptation.png", title: "Adaptability" },
    { url: "/src/Images/Home/OurVision/integrity.png", title: "Ethics and Integrity" },
  ];

  return (
    <section className="text-silver bg-darkblue py-10">
      <h1 className="md:text-4xl text-2xl font-bold flex text-silver py-10 justify-center">
        Our Vision
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-5 text-center justify-center py-6">
        {reasons.map((reason, index) => {
          const { ref, inView } = useInView({
            triggerOnce: true, // Trigger the animation only once when it enters the view
            threshold: 0.3, // Trigger when 30% of the element is in view
          });

          return (
            <div
              ref={ref}
              key={index}
              className={`lg:py-[50px] sm:lg:py-[30px] py-[5px] flex flex-col items-center font-secondary ${
                inView ? "animate-fade-in" : "" // Add animation class conditionally
              }`}
            >
              <img
                src={reason.url}
                alt={reason.title}
                className="rounded-xl lg:w-[70px] lg:h-[70px] sm:md:w-[50px] sm:md:h-[50px] w-[30px] h-[30px] mb-4"
              />
              <p className="lg:text-lg sm:lg:text-md text-sm font-semibold">{reason.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurVision;
