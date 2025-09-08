import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer"; // Import IntersectionObserver

// Data for "Why Choose Us" section
const reasons = [
  {
    title: "Tailored Designs",
    description:
      "Every concept we create is unique to you. We don’t offer cookie-cutter designs—each project is custom-tailored to your preferences.",
    image: "/src/Images/Conceptualization/tailoredDesign.png", // Image for Tailored Designs
  },
  {
    title: "Expertise and Creativity",
    description:
      "With years of experience in the industry, we bring innovative and practical design solutions that suit both style and function.",
    image: "/src/Images/Conceptualization/creativity.png", // Image for Expertise and Creativity
  },
  {
    title: "Collaborative Process",
    description:
      "Your input is invaluable. We collaborate with you every step of the way, ensuring that the final concept truly represents your vision.",
    image: "/src/Images/Conceptualization/collaborative.png", // Image for Collaborative Process
  },
  {
    title: "Attention to Detail",
    description:
      "We focus on every aspect of the design, from the big picture to the smallest detail, ensuring a cohesive and harmonious final result.",
    image: "/src/Images/Conceptualization/attention-to-detail.png", // Image for Attention to Detail
  },
];

const WhyChooseUsConcept = () => {
  return (
    <section className="bg-gray-50 py-12">
      <header className="text-center mb-12">
        <motion.h2
          className="md:text-3xl text-xl font-extrabold text-cyan-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose Us for Your Conceptualization?
        </motion.h2>
      </header>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {reasons.map((reason, index) => (
          <InView
            key={index}
            triggerOnce
            onChange={(inView) => {
              // Trigger animation when content is in view
            }}
          >
            {({ inView, ref }) => (
              <motion.div
                ref={ref}
                className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 1, delay: index * 0.2 }}
              >
                <img
                  src={reason.image}
                  alt={reason.title}
                  className="w-20 h-20 mb-4 object-cover"
                />
                <motion.h3
                  className="md:text-xl text-xl font-bold mb-2 text-cyan-700"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -30 }}
                  transition={{ duration: 1 }}
                >
                  {reason.title}
                </motion.h3>
                <motion.p
                  className="md:text-sm text-xs text-gray-700 font-semibold"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -30 }}
                  transition={{ duration: 1 }}
                >
                  {reason.description}
                </motion.p>
              </motion.div>
            )}
          </InView>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUsConcept;
