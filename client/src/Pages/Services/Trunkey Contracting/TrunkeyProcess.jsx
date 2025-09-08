import React from "react";
import { InView } from "react-intersection-observer";

const TurnkeyProcess = () => {
  const Process = [
    {
      title: "1. Consultation and Planning",
      Desc: "Understand your vision and create a detailed project plan.",
    },
    {
      title: "2. Design and Approval",
      Desc: "Develop designs and get your approval before proceeding.",
    },
    {
      title: "3. Construction and Execution",
      Desc: "Execute the plan with expert craftsmanship and supervision.",
    },
    {
      title: "4. Handover",
      Desc: "Deliver the completed project, ready for immediate use.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-700 p-10">
      <h1 className="md:text-3xl text-2xl font-extrabold text-white mb-10 text-center">
        Our Turnkey Contracting Process
      </h1>

      <div className="relative w-full max-w-4xl">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white h-full"></div>

        <div className="flex flex-col space-y-10">
          {Process.map((item, index) => (
            <InView
              key={index}
              threshold={0.5}
              triggerOnce
            >
              {({ inView, ref }) => (
                <div
                  ref={ref}
                  className={`bg-white p-8 rounded-lg shadow-lg transform transition-all duration-500 ${
                    inView ? "animate-scale-up" : "opacity-0"
                  }`}
                >
                  <h2 className="md:text-xl text-md font-bold text-blue-600">
                    {item.title}
                  </h2>
                  <p className="md:text-sm text-xs font-semibold text-gray-700">
                    {item.Desc}
                  </p>
                </div>
              )}
            </InView>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TurnkeyProcess;
