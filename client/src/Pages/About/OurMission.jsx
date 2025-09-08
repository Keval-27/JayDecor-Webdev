import React from "react";
import { useState, useEffect, useRef } from "react";

const OurMission = () => {
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef(null);

  // Intersection Observer Callback function
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true); // Set the state to true when the element is in view
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    if (textRef.current) {
      observer.observe(textRef.current); // Start observing the text element
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current); // Cleanup observer when component unmounts
      }
    };
  }, []);

  return (
    <section className="  flex flex-col md:flex-row items-center  justify-center  gap-4 md:p-5 p-3 ">
      <div className="">
        <img
          src="/src/Images/About/OurMission.jpg"
          alt=""
          className=" w-full md:h-[600px] sm:h-[500px] h-[300px] rounded-lg md:object-contain object-cover"
        />
      </div>
      <div className=" md:w-1/2 w-full  text-darkblue  ">
        <div
          className={` md:pb-10 pb-5  font-boldtransition-opacity duration-1000 ${
            isInView ? "animate-slide-Right" : "opacity-0"
          }`}
          ref={textRef}
        >
          <h1 className=" md:text-3x text-xl  font-bold flex  justify-center">
            OUR MISSION
          </h1>
        </div>
        <div
          className={` md:xl:text-lg  text-sm font-primary md:tracking-[0.1rem] px-2  font-semibold 'transition-opacity duration-3000
             ${isInView ? "animate-slide-Down" : "opacity-0"}`}
          ref={textRef}
        >
          <p className="lg:pt-5 pt-4 md:leading-normal leading-relaxed">
            At Studio JayDecor, We focus on creating Unique design with giving
            Functionality to it, Creating an Healthy atmosphere where comfort
            meets style, With a Tranquil environment helping people to Breath
            into the space and blend in with each other to create a better bond.
          </p>
          <p className="lg:pt-9 pt-4 md:leading-normal leading-relaxed">
            Providing with best Design for your space, at Studio JayDecor we
            have options for design for you as per your Budget. From High – End
            to Budget friendly we provide with all kind of Design workability
            aligning to your Budget and Quality of work.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
