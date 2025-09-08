import React from "react";
import { useInView } from "react-intersection-observer"; // Import useInView

const StepFlow = () => {
  const steps = [
    {
      num: "1",
      url: "/src/Images/Home/Process/Requirement.gif",
      title: "Understand your requirements",
      description:
        "Craft ideal tailored design solutions for your needs and preferences.",
    },
    {
      num: "2",
      url: "/src/Images/Home/Process/3dDesign.gif",
      title: "Experience Design in 3D",
      description:
        "Experts create 3D visuals, bringing your envisioned space to life vividly.",
    },
    {
      num: "3",
      url: "/src/Images/Home/Process/select.gif",
      title: "Affordable Material Solutions",
      description:
        "Guide in curating ideal style with materials, textures, furniture, budget. Create unique, perfect space.",
    },
    {
      num: "4",
      url: "/src/Images/Home/Process/tasking.gif",
      title: "Execute the Design",
      description:
        "Passionately reshape space, ensure quality, updates, seamless process for your vision.",
    },
    {
      num: "5",
      url: "/src/Images/Home/Process/house.gif",
      title: "Enter Your Happy Place",
      description:
        "Receive keys, warranty, completion letter - your dream home is ready!",
    },
  ];

  return (
    <section className="md:py-16 md:px-10 px-5 text-darkblue bg-[#87A8B7]">
      <h1 className="font-primary flex items-center justify-center md:text-4xl text-2xl font-bold py-10">
        Process Made Simple
      </h1>
      <div className="py-5 flex flex-wrap items-center justify-evenly md:gap-8 gap-3">
        {steps.map((step, index) => {
          const { ref, inView } = useInView({
            triggerOnce: true, // Trigger the animation only once
            threshold: 0.3, // Trigger when 30% of the element is in view
          });

          return (
            <div
              ref={ref}
              key={index}
              className={`md:w-72 w-36 md:h-[350px] h-[270px] bg-gray-200 rounded-md ${
                inView ? "animate-bounce-in" : "opacity-0" // Apply animation when inView is true
              }`} // Add animation class conditionally
            >
              <div className="gap-2 px-2 py-2 flex flex-col text-center justify-center items-center">
                <h1 className="font-bold md:text-2xl text-lg">{step.num}</h1>
                <img
                  src={step.url}
                  alt={step.title}
                  className="rounded-lg md:w-[100px] md:h-[100px] w-[50px] h-[50px]"
                />
                <h1 className="text-sm md:text-lg font-bold">{step.title}</h1>
                <p className="md:py-3 text-xs md:text-base font-secondary">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StepFlow;
