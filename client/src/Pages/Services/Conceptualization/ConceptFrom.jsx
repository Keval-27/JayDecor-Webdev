import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer"; // Import IntersectionObserver

const ConceptFrom = () => {
  return (
    <section className="bg-cyan-600 py-16 text-white text-center">
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            className="animate-bounce-in"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
            transition={{ duration: 1 }}
          >
            <h2 className="md:text-3xl text-xl font-bold mb-6">
              Get Started Today
            </h2>
            <p className="md:text-lg text-sm mb-4">
              From Vision to Reality: Your Space, Your Style!
            </p>
            <button className="bg-white text-darkblue font-semibold py-3 px-6 md:text-lg text-sm rounded-lg hover:bg-teal-100 transition duration-300">
              Start Your Journey
            </button>
          </motion.div>
        )}
      </InView>
    </section>
  );
};

export default ConceptFrom;
