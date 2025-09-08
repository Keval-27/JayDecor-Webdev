import React, { useState, useEffect } from "react";

const SmartStyleQuiz = () => {
  const [formData, setFormData] = useState({
    color: "",
    furniture: "",
    vibe: "",
    space: "",
    material: "",
  });

  const [predictedStyle, setPredictedStyle] = useState("");
  const [matchingDesigns, setMatchingDesigns] = useState([]);
  const [matchingProjects, setMatchingProjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageIndices, setImageIndices] = useState({});

  const options = {
    color: ["White", "Earthy", "Bold", "Pastel", "Monochrome"],
    furniture: ["Modern", "Rustic", "Vintage", "Minimalist", "Industrial"],
    vibe: ["Calm", "Cozy", "Energetic", "Luxurious", "Creative"],
    space: ["Living Room", "Bedroom", "Workspace", "Kitchen", "Balcony"],
    material: ["Wood", "Fabric", "Metal", "Glass", "Stone"],
  };

  useEffect(() => {
    const saved = localStorage.getItem("styleQuizResults");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed.formData || {});
      setPredictedStyle(parsed.style || "");
      setMatchingDesigns(parsed.designs || []);
      setMatchingProjects(parsed.projects || []);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (id, images, direction) => {
    setImageIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % images.length
          : (currentIndex - 1 + images.length) % images.length;
      return { ...prev, [id]: newIndex };
    });
  };

  const handleSubmit = async () => {
    setError("");
    setPredictedStyle("");
    setMatchingDesigns([]);
    setMatchingProjects([]);
    setLoading(true);

    if (Object.values(formData).some((v) => v === "")) {
      setError("Please answer all questions.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/style-finder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!result.style) {
        setError("Prediction failed. Try again.");
        setLoading(false);
        return;
      }

      setPredictedStyle(result.style);
      setMatchingDesigns(result.matchingDesigns || []);
      setMatchingProjects(result.matchingProjects || []);

      // Save to localStorage
      localStorage.setItem(
        "styleQuizResults",
        JSON.stringify({
          formData,
          style: result.style,
          designs: result.matchingDesigns || [],
          projects: result.matchingProjects || [],
        })
      );
    } catch (err) {
      console.error(err);
      setError("Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const renderCard = (item, isProject = false) => {
    const images = item.img && item.img.length > 0 ? item.img : ["/placeholder.jpg"];
    const currentIndex = imageIndices[item._id] || 0;

    return (
      <div key={item._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="relative h-80">
          <img
            src={images[currentIndex]}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={() => handleImageChange(item._id, images, "prev")}
                className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow"
              >
                ◀
              </button>
              <button
                onClick={() => handleImageChange(item._id, images, "next")}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 px-2 py-1 rounded-full shadow"
              >
                ▶
              </button>
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setImageIndices((prev) => ({ ...prev, [item._id]: index }))
                    }
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex
                        ? "bg-blue-500"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    title={`Go to image ${index + 1}`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="p-4">
          <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600">
            {isProject ? item.desc : item.type || "No description available."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-12 m-48">
      {/* Quiz Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-3xl w-full mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🏠 Discover Your Interior Style
        </h2>
        {Object.keys(options).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-gray-700 capitalize mb-1">{key}</label>
            <select
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select {key}</option>
              {options[key].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition duration-200 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          🎨 {loading ? "Loading..." : "Get Recommendation"}
        </button>

        {predictedStyle && (
          <div className="mt-6 text-center text-lg text-green-700 font-semibold">
            ✅ Recommended Style: <span className="text-green-900">{predictedStyle}</span>
          </div>
        )}
      </div>

      {/* Matching Designs and Projects */}
      <div className="space-y-16">
        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            🎨 Matching Designs
          </h3>
          {matchingDesigns.length === 0 ? (
            <p className="text-gray-500 text-center">No designs found for this style.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingDesigns.map((design) => renderCard(design))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            🎗️ Matching Projects
          </h3>
          {matchingProjects.length === 0 ? (
            <p className="text-gray-500 text-center">No projects found for this style.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingProjects.map((project) => renderCard(project, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartStyleQuiz;
