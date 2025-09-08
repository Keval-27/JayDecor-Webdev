import React from "react";
import { useInView } from "react-intersection-observer";

const OurTeam = () => {
  // Intersection Observer for team profile sections
  const { ref: teamRef, inView: teamInView } = useInView({
    triggerOnce: true, // Trigger animation only once when it comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  return (
    <section className="text-darkblue md:py-12 h-auto" ref={teamRef}>
      <h1
        className={`md:text-4xl text-2xl font-bold flex justify-center items-center py-10 transition-all duration-1000 ${
          teamInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Our Team
      </h1>
      <div className="flex md:flex-row flex-col justify-center items-center md:gap-16 gap-40 py-32">
        {/* Indra Makwana Profile */}
        <div
          className={`relative bg-gray-200 rounded-2xl transition-all duration-1000 ${
            teamInView ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <img
            src="/src/Images/About/IndraMakwana.jpg"
            alt="Indra Makwana"
            className="rounded-full md:w-[200px] md:h-[200px] w-[180px] h-[180px] absolute md:right-[78px] md:-top-[120px] right-[55px] -top-[110px]"
          />
          <div className="inset-0 flex flex-col items-center justify-center text-darkblue md:w-[350px] md:h-[350px] w-[300px] h-[300px] animate-bounce-in">
            <h1 className="md:text-3xl text-xl font-bold">Indra Makwana</h1>
            <h1 className="md:text-2xl text-lg py-5">- Interior Designer -</h1>
          </div>
        </div>

        {/* Jay Siddhapura Profile */}
        <div
          className={`relative bg-gray-200 rounded-2xl transition-all duration-1000 ${
            teamInView ? "animate-bounce-in" : "opacity-0"
          }`}
        >
          <img
            src="/src/Images/About/JaySiddhapura.jpg"
            alt="Jay Siddhapura"
            className="rounded-full md:w-[200px] md:h-[200px] w-[180px] h-[180px] absolute md:right-[78px] md:-top-[120px] right-[55px] -top-[110px]"
          />
          <div className="inset-0 flex flex-col items-center justify-center text-darkblue md:w-[350px] md:h-[350px] w-[300px] h-[300px] ">
            <h1 className="md:text-3xl text-xl font-bold">Jay Siddhapura</h1>
            <h1 className="md:text-2xl text-lg py-5">- 3D Visualiser -</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
