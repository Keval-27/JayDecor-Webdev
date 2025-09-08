import React from "react";
import { useLocation, Link } from "react-router-dom";

const PersonalizedPage = () => {
  const location = useLocation();
  const { selectedStyle, matchingProjects = [], matchingDesigns = [] } = location.state || {};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Your Personalized Style: <span className="text-indigo-600">{selectedStyle || "Unknown"}</span>
      </h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Based on your answers, here are designs and projects that match your style.
      </p>

      {/* Matching Projects */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Matching Projects</h2>
        {matchingProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matchingProjects.map((project) => (
              <div key={project._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="text-xl font-medium">{project.title}</h3>
                <p className="text-gray-600 text-sm">{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No matching projects found.</p>
        )}
      </section>

      {/* Matching Designs */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Matching Designs</h2>
        {matchingDesigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {matchingDesigns.map((design) => (
              <div key={design._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h3 className="text-xl font-medium">{design.title}</h3>
                <p className="text-gray-600 text-sm">{design.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No matching designs found.</p>
        )}
      </section>

      {/* Explore More Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link to={`/gallery?style=${selectedStyle}`}>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700">
            Explore More Designs
          </button>
        </Link>
        <Link to={`/portfolio?style=${selectedStyle}`}>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700">
            View More Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PersonalizedPage;
