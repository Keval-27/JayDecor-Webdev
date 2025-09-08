import React from "react";
import {
  FaClipboardList,
  FaPalette,
  FaHammer,
  FaProjectDiagram,
  FaStar,
} from "react-icons/fa";

const ConsultancyProcess = () => {
  const steps = [
    {
      title: "Step 1: Initial Consultation",
      desc: "We start with a one-on-one consultation to understand your needs, style, and goals. This allows us to create a roadmap for your design journey.",
      icon: <FaClipboardList className="text-cyan-500 text-3xl" />,
    },
    {
      title: "Step 2: Concept Development",
      desc: "Based on your feedback, we develop initial design concepts and mood boards to give you a sense of the look and feel of your space.",
      icon: <FaPalette className="text-cyan-500 text-3xl" />,
    },
    {
      title: "Step 3: Design Execution",
      desc: "After you approve the design, we move forward with space planning, product selection, and detailed design specifications.",
      icon: <FaHammer className="text-cyan-500 text-3xl" />,
    },
    {
      title: "Step 4: Project Management & Installation",
      desc: "We oversee the execution, coordinating with contractors, sourcing materials, and ensuring everything is on track.",
      icon: <FaProjectDiagram className="text-cyan-500 text-3xl" />,
    },
    {
      title: "Step 5: Final Styling & Completion",
      desc: "Once the work is done, we add the finishing touches to bring your vision to life. The final result will be a space you’ll love.",
      icon: <FaStar className="text-cyan-500 text-3xl" />,
    },
  ];

  return (
    <section className="bg-gray-100 py-10">
      <h2 className="md:text-4xl text-2xl font-bold text-center text-darkblue mb-8">
        Our Process
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 p-3 md:grid-cols-2 md:gap-6 gap-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center mb-4">
              {step.icon}
              <h3 className="md:text-xl font-bold text-cyan-500 ml-3">
                {step.title}
              </h3>
            </div>
            <p className="md:text-md text-sm font-semibold text-darkblue">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConsultancyProcess;
