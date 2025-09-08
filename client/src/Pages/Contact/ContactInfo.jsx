import React from "react";
import { useInView } from "react-intersection-observer";

const ContactInfo = () => {
  const email = "studiojaydecor1969@gmail.com";

  // Intersection Observer for the Contact Section
  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true, // Trigger once when it comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  return (
    <section className="w-full py-14 border-b-2" ref={contactRef}>
      <h1
        className={`text-center text-darkblue font-bold md:text-3xl text-2xl transition-all duration-1000 ${
          contactInView ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        Get In Touch
      </h1>

      {/* Contact Number */}
      <div className="flex md:flex-row flex-col text-center justify-center items-center py-9 gap-16">
        <div
          className={`w-64 h-80 shadow-2xl bg-slate-200 font-semibold flex flex-col items-center justify-center rounded-md transition-all duration-1000 ${
            contactInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <img
            src="/src/Images/ContactUS/smartphone-call.png"
            alt="Phone"
            className="w-16 h-14"
          />
          <h1 className="pt-5 pb-3 text-cyan-500 text-xl">Phone Number</h1>
          <h2>
            <a
              href="tel:+919820208503"
              className="text-darkblue hover:text-blue-700"
            >
              +91 9820208503
            </a>
          </h2>
          <h2>
            <a
              href="tel:+919167333845"
              className="text-darkblue hover:text-blue-700"
            >
              +91 9167333845
            </a>
          </h2>
        </div>

        {/* Address Info */}
        <div
          className={`w-64 h-80 shadow-2xl bg-slate-200 font-semibold flex flex-col items-center justify-center rounded-md transition-all duration-1000 ${
            contactInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <img
            src="/src/Images/ContactUS/location.png"
            alt="Location"
            className="w-16 h-14"
          />
          <h1 className="pt-5 pb-3 text-cyan-500 text-xl">Address Info</h1>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Vrindavan+Rd,+Ovaripada,+Dahisar+East,+Mumbai,+Maharashtra+400068,+India"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-darkblue hover:text-blue-700"
          >
            Vrindavan Rd, Ovaripada, Dahisar East, Mumbai, Maharashtra 400068, India
          </a>
        </div>

        {/* Email Address */}
        <div
          className={`w-auto h-80 shadow-2xl bg-slate-200 font-semibold flex flex-col items-center justify-center rounded-md px-2 transition-all duration-1000 ${
            contactInView ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <img
            src="/src/Images/ContactUS/message-alert.png"
            alt="Email"
            className="w-16 h-14"
          />
          <h1 className="text-xl pt-4 text-cyan-500 font-semibold">Email ID</h1>
          <a
            href={`mailto:${email}`}
            className="text-darkblue hover:text-blue-700 pt-5 pb-3 font-semibold"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
