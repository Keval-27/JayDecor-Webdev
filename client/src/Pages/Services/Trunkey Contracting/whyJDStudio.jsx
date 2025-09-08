import React from "react";
import { InView } from "react-intersection-observer";

const WhyJDStudio = () => {
  const whyJD = [
    {
      title: "Experience You Can Trust",
      desc: "With years of expertise, we’ve successfully delivered countless projects.",
      button: "Get in Touch",
      href: "/Projects",
    },
    {
      title: "Dedicated Team",
      desc: "Our skilled professionals are committed to excellence.",
      button: "Know More",
      href: "/About",
    },
    {
      title: "Innovative Solutions",
      desc: "We leverage the latest technologies and methodologies.",
      button: "Explore Our Work",
      href: "/Projects",
    },
    {
      title: "Customer-Centric Approach",
      desc: "Your satisfaction is our top priority.",
      button: "Contact Us Now",
      href: "/contact",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6">
      {/* Header Section */}
      <header className="text-center mb-16">
        <h1 className="md:text-3xl text-2xl font-extrabold text-darkblue">
          Why Studio Jay Decor?
        </h1>
        <p className="md:text-base font-semibold text-darkblue mt-4">
          Discover what sets us apart from the competition.
        </p>
      </header>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {whyJD.map((item, index) => (
          <InView
            key={index}
            threshold={0.5}
            triggerOnce
          >
            {({ inView, ref }) => (
              <div
                ref={ref}
                className={`group relative bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-500 ${
                  inView ? "animate-flip-card" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-cyan-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="p-6 relative z-10">
                  <h2 className="md:text-2xl text-lg font-bold text-darkblue mb-4 group-hover:text-cyan-600 transition-colors duration-300">
                    {item.title}
                  </h2>
                  <p className="text-Darkblue md:text-base text-sm font-semibold mb-6">
                    {item.desc}
                  </p>
                  <a
                    href={item.href}
                    className="text-white bg-cyan-600 hover:bg-cyan-700 md:text-md text-sm py-2 md:px-6 px-3 rounded-lg transition-colors duration-300"
                  >
                    {item.button}
                  </a>
                </div>
              </div>
            )}
          </InView>
        ))}
      </div>
    </div>
  );
};

export default WhyJDStudio;
