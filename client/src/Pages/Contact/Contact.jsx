import React from "react";
import ContactForm from "../../Components/ContactForm.jsx";
import { useInView } from "react-intersection-observer";

const Contact = () => {
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true, // Trigger once when it comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  return (
    <section className="w-full py-10 bg-gray-100" ref={contactRef}>
      <div className="md:flex items-center gap-8 px-4 md:px-20 lg:px-40">
        {/* Info Section */}
        <div
          className={`w-full text-center text-darkblue font-bold ${
            contactInView ? "animate-slide-Left" : "opacity-0"
          }`}
        >
          <h1 className="text-2xl md:text-4xl mb-6">We’d love to hear from you</h1>
          <p className="text-md md:text-xl">
            Whether your query is about features, materials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
