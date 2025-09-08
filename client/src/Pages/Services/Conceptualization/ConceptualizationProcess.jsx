import React, { useState } from "react";
import Slider from "react-slick";


// Step-by-step process data
const steps = [
  {
    title: "Step 1: Client Consultation and Discovery",
    description:
      "We begin by listening to you. Through consultations, we ask questions that help us understand your lifestyle, preferences, and functional needs. Whether you're revamping a single room or an entire property, this stage ensures that we’re on the same page from the start.",
    image: "/src/Images/Conceptualization/concept3.png",
  },
  {
    title: "Step 2: Concept Development",
    description:
      "Based on your needs and the goals of the space, our team creates an initial design concept. This involves experimenting with layouts, color schemes, furniture styles, and decor to determine what works best for the space and your vision.",
    image: [
      "/src/Images/Conceptualization/concept4.png",
    ],
  },
  {
    title: "Step 3: Mood Boards and Design Style Exploration",
    description:
      "A mood board is created to give you a sense of the overall aesthetic of the space. It may include color palettes, textures, materials, and inspirational images. We explore various design styles, whether modern, bohemian, industrial, minimalist, or eclectic, to find the one that best suits you.",
    image: [
      "/src/Images/Conceptualization/conceptprocess1.png",
    ],
  },
  {
    title: "Step 4: Client Feedback and Adjustments",
    description:
      "Collaboration is key! After presenting the concept and mood board, we gather your feedback and make adjustments to align the design with your preferences. This is a back-and-forth process where we refine the design to meet your exact needs.",
    image: "/src/Images/Conceptualization/concept2.png",
  },
];

const ConceptualizationProcess = () => {
  const [activeStep, setActiveStep] = useState(1);

  // Slider settings for images
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Navigation handlers
  const goToNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
      document.getElementById(`step-${activeStep + 1}`).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const goToPrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      document.getElementById(`step-${activeStep - 1}`).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gray-50 ">
      <header className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white py-8 animate-">
        <h1 className="text-center md:text-3xl  text-xl font-extrabold">Where Ideas Take Shape, and Designs Begin to Flourish</h1>
      </header>

      <header className="text-center  md:text-3xl text-xl font-extrabold text-cyan-500 pt-12">
          Our Conceptualization Process
      </header>

      <main className="container mx-auto px-6 py-10 space-y-12 md:border-b-8 border-b-4  border-darkblue">
        {/* Navigation for Steps */}
        <div className="flex justify-center gap-8 mb-6 ">
          {steps.map((step, index) => (
            <button
              key={index}
              className={`md:text-lg text-sm font-semibold ${
                activeStep === index + 1 ? "text-cyan-500" : "text-gray-500" } hover:text-cyan-700 `}
              onClick={() => setActiveStep(index + 1)}
            >
              Step {index + 1}
            </button>
          ))}
        </div>

        {/* Previous and Next Step buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={goToPrevStep}
            className="px-4 py-2 text-white  md:text-lg text-sm bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeStep === 1}
          >
            Prev Step
          </button>
          <button
            onClick={goToNextStep}
            className="px-4 py-2 text-white md:text-lg text-sm bg-cyan-500 rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={activeStep === steps.length}
          >
            Next Step
          </button>
        </div>

        {/* Content for active step */}
        {steps.map((step, index) => (
          <div
            key={index}
            id={`step-${index + 1}`}
            className={`${
              activeStep === index + 1 ? "block" : "hidden"
            } space-y-8`}
          >
            <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start bg-white shadow-xl rounded-lg p-6 gap-6">
              {/* Display image(s) or slider for step */}
              {step.images ? (
                <Slider {...sliderSettings}>
                  {step.image.map((image, idx) => (
                    <div key={idx}>
                      <img
                        src={image}
                        alt={`${step.title} image ${idx + 1}`}
                        className="rounded-lg shadow-md w-full md:w-[500px] md:h-[450px] object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img
                  src={step.image}
                  alt={step.title}
                  className="rounded-lg shadow-md w-full md:w-[500px] md:h-[450px] object-cover"
                />
              )}

              {/* Text content for the step */}
              <div className="text-center md:text-left md:w-1/2">
                <h2 className="md:text-xl text-base md:pt-9 text-darkblue font-bold md:mb-4">
                  {step.title}
                </h2>
                <p className="md:text-base text-xs text-darkblue font-semibold pt-6">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ConceptualizationProcess;
