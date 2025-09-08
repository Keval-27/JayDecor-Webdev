


import React from "react";
import { motion } from "framer-motion";
import { InView } from "react-intersection-observer"; // Import IntersectionObserver

const ConsultancyFrom = () => {
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
            Get Started Today            </h2>
            <p className="md:text-lg text-sm mb-4">
            Ready to transform your space? Let’s bring your vision to life!
            </p>
            <button className="bg-white text-darkblue font-semibold py-3 px-6 md:text-lg text-sm rounded-lg hover:bg-teal-100 transition duration-300">
            Schedule a Consultation
            </button>
          </motion.div>
        )}
      </InView>
    </section>
  );
};

export default ConsultancyFrom;
