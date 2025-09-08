import React, { useState, useEffect, useRef } from "react";
import Popup from "../../Components/Popup";
import { useFetchAllDesignsQuery } from "../../Redux/Features/Designs/designsApi";

const DesignFilter = [
  { title: "All" },
  { title: "Livingroom" },
  { title: "Bedroom" },
  { title: "Kids Bedroom" },
  { title: "Wardrobe" },
  { title: "Bathroom" },
  { title: "Kitchen" },
  { title: "Dining Room" },
];

const DesignGallery = () => {
  // Fetch designs data from API
  const { data, isLoading, isError } = useFetchAllDesignsQuery();

  // Defensive: designs could be undefined or data could be wrapped differently
  // Adjust this based on actual API response shape
  const designs = Array.isArray(data?.designs) ? data.designs : [];

  // States
  const [modalImages, setModalImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [visibleItems, setVisibleItems] = useState(new Set());
  const gridRefs = useRef([]); // refs for grid items

  // Filtered designs based on selected filter
  const filteredGalleryData =
    filter === "All"
      ? designs
      : designs.filter((design) => design.type === filter);

  // Modal handlers
  const openModal = (images) => {
    setModalImages(images);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setModalImages([]);
    setCurrentImageIndex(0);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + modalImages.length) % modalImages.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  // Intersection Observer: animate items when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.2 }
    );

    gridRefs.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      gridRefs.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, [filteredGalleryData]);

  // Popup state and handlers
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // Handle loading and error states early
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading projects.</div>;

  return (
    <div className="container mx-auto py-24">
      <h1 className="md:text-3xl text-2xl font-extrabold text-center text-darkblue mb-4">
        Interior Design Gallery
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-1 space-x-2 mb-8">
        {DesignFilter.map((category) => (
          <button
            key={category.title}
            className={`md:px-4 md:py-2 p-2 md:text-sm text-[10px] rounded-lg text-white ${
              filter === category.title ? "bg-blue-500" : "bg-gray-400"
            } hover:bg-blue-600 focus:bg-blue-600`}
            onClick={() => setFilter(category.title)}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-10 gap-5 px-5">
        {filteredGalleryData.length > 0 ? (
          filteredGalleryData.map((item, index) => (
            <div
              key={item.id}
              data-index={index}
              ref={(el) => (gridRefs.current[index] = el)}
              className={`relative group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 md:h-72 h-60 ${
                visibleItems.has(index) ? "animate-scale-up" : "opacity-0"
              }`}
            >
              {Array.isArray(item.img) && item.img.length > 0 ? (
                <img
                  src={item.img[0]}
                  alt={item.title}
                  onClick={() => openModal(item.img)}
                  className="cursor-pointer w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                  No Image Available
                </div>
              )}

              <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black to-transparent opacity-80 hover:opacity-90 transition duration-300 rounded-lg">
                <h2 className="md:text-xl text-lg font-semibold">
                  {item.title}
                </h2>
                <h3 className="md:text-base text-sm font-semibold">
                  {item.type}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No Designs available.</p>
        )}
      </div>

      {/* Popup for Property/Consultant Form */}
      <Popup isOpen={isPopupOpen} onClose={closePopup} />

      <div className="mt-4 flex items-center justify-center">
        <button
          onClick={openPopup}
          className="bg-blue-600 md:text-base text-sm text-white py-2 px-4 rounded-md"
        >
          Book Consultant Inquiry
        </button>
      </div>

      {/* Modal for images */}
      {Array.isArray(modalImages) && modalImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2"
          onClick={closeModal}
        >
          <div
            className="modal-content bg-white p-4 rounded-lg relative md:w-[900px] md:h-[600px] w-[450px] h-[450px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-600 text-3xl"
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Previous image */}
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-gray-600 text-4xl"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              &#10094;
            </button>

            {/* Image */}
            <img
              src={modalImages[currentImageIndex]}
              alt={`Modal view ${currentImageIndex + 1}`}
              className="w-full h-full object-contain p-2 rounded-lg"
            />

            {/* Next image */}
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-600 text-4xl"
              onClick={handleNext}
              aria-label="Next image"
            >
              &#10095;
            </button>

            {/* Dots navigation */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {modalImages.map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    idx === currentImageIndex
                      ? "bg-cyan-700"
                      : "bg-gray-400 hover:bg-gray-500"
                  } transition-all duration-300`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Go to image ${idx + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleDotClick(idx);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignGallery;
