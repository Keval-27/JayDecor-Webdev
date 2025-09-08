import React from "react";
import { useInView } from "react-intersection-observer";

const Other_IDServices = () => {
  const { ref: card1Ref, inView: card1InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  const { ref: card2Ref, inView: card2InView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section className="py-16  bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-3">
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className={`relative bg-white shadow-lg rounded-lg overflow-hidden group transform transition-transform duration-300 ${
            card1InView ? "animate-slide-Left" : "opacity-0"
          }`}
        >
          <div className="relative  md:p-8 p-4 bg-gradient-to-t from-blue-500 to-blue-700 text-white">
            <h1 className="md:text-3xl text-xl font-bold mb-4">2D Design + WD</h1>
            <p className="text-gray-200 md:text-lg text-sm mb-4">
              Floor plans and working drawings tailored to your unique
              requirements.
            </p>
            <img
              src="/src/Images/WelcomeJD.jpg"
              alt="3D Visualization"
              className="mt-4 w-full h-52 object-cover rounded-lg"
            />
          
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-blue-600 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-200 md:text-lg text-sm mb-4">
              Detailed working drawings, including kitchen and furniture
              designs, crafted for your needs.
            </p>
       
          </div>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className={`relative bg-white shadow-lg rounded-lg overflow-hidden group transform transition-transform duration-300 ${
            card2InView ? "animate-slide-Right" : "opacity-0"
          }`}
        >
          <div className="relative md:p-8 p-4 bg-gradient-to-t from-green-500 to-teal-700 text-white">
            <h1 className="md:text-3xl text-xl font-bold mb-4">3D Visualization</h1>
            <p className="text-gray-200 md:text-lg text-sm mb-4">Realistic 3D renderings to preview your design vision.</p>
            <img
              src="/src/Images/WelcomeJD.jpg"
              alt="3D Visualization"
              className="mt-4 w-full h-52 object-cover rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-teal-600 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="md:text-lg text-sm ">
              Explore every detail of your layout, colors, and materials with
              lifelike 3D renderings.
            </p>
      
          </div>
        </div>
      </div>
    </section>
  );
};

export default Other_IDServices;
