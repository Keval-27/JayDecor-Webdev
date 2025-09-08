import React from "react";
import LikeButton from "./LikeButton";

const ProjectCard = ({
  project,
  projectIndex,
  currentImageIndex,
  onPrevImage,
  onNextImage,
  onSelectImage,
  onLike,
  openPopup,
}) => {
  return (
    <div className="shadow-custom-dark md:p-4 p-2 rounded-lg overflow-hidden">
      <div className="relative w-full h-92 bg-gray-100">
        <img
          src={project.img[currentImageIndex || 0]}
          alt={project.title}
          className="w-full md:h-[400px] h-60 object-contain"
        />
        <button
          onClick={() => onPrevImage(projectIndex, project.img)}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-blue-500"
        >
          <img
            src="/src/Images/left-arrow.png"
            alt=""
            className="w-4 h-4"
          />
        </button>
        <button
          onClick={() => onNextImage(projectIndex, project.img)}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-blue-500"
        >
          <img
            src="/src/Images/right-arrow.png"
            alt=""
            className="w-4 h-4"
          />
        </button>
      </div>
      <div className="p-3">
        <h2 className="md:text-lg text-md font-bold grid grid-flow-col items-center">
          {project.title}
          <span className="md:text-sm text-xs font-semibold text-right">
            {project.type}
          </span>
        </h2>
        <p className="text-xs font-semibold">{project.desc}</p>

        <div className="flex overflow-x-auto gap-2 mt-4">
          {project.img.map((image, imgIndex) => (
            <img
              key={imgIndex}
              src={image}
              alt={`${project.title} Thumbnail ${imgIndex + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                currentImageIndex === imgIndex ? "border-4 border-blue-500" : ""
              }`}
              onClick={() => onSelectImage(projectIndex, imgIndex)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 w-full flex items-center justify-center">
        <button
          onClick={openPopup}
          className="bg-blue-600 md:text-base text-sm text-white py-2 px-4 rounded-md"
        >
          Book Consultant Inquiry
        </button>

        <button
          onClick={() => onLike(project._id)}
          className="flex items-center gap-1 mt-2"
          aria-label={project.isLiked ? "Unlike project" : "Like project"}
        >
          <LikeButton filled={project.isLiked} />
          <span>{project.likes || 0}</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;