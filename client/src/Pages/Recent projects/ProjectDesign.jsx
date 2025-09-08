import React, { useState, useEffect } from "react";
import {
  useFetchAllProjectsQuery,
  useLikeProjectMutation,
} from "../../Redux/Features/Projects/projectsApi";
import Popup from "../../Components/Popup";
import LikeButton from "../../Components/LikeButton";
import axios from "axios";




const ProjectFilter = [
  { title: "All" },
  { title: "Residential" },
  { title: "Commercial" },
];

const ITEMS_PER_PAGE = 12;

const ProjectDesign = () => {
  const { data, isLoading, isError } = useFetchAllProjectsQuery();
  const [likeProject] = useLikeProjectMutation();


  const projects = data?.projects || [];

  const [filter, setFilter] = useState("All");  
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  useEffect(() => {
    const startIndex = 0;
    const endIndex = ITEMS_PER_PAGE;
    setDisplayedProjects(filteredProjects.slice(startIndex, endIndex));
    setCurrentPage(1);
  }, [filter, projects]);

  const loadMoreProjects = () => {
    if (loading || displayedProjects.length >= filteredProjects.length) return;
    setLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = nextPage * ITEMS_PER_PAGE;

    setTimeout(() => {
      setDisplayedProjects((prev) => [
        ...prev,
        ...filteredProjects.slice(startIndex, endIndex),
      ]);
      setCurrentPage(nextPage);
      setLoading(false);
    }, 1000);
  };

  const handlePreviousImage = (projectIndex, images) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] > 0 ? prev[projectIndex] - 1 : images.length - 1,
    }));
  };

  const handleNextImage = (projectIndex, images) => {
    setCurrentImageIndices((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] < images.length - 1 ? prev[projectIndex] + 1 : 0,
    }));
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading projects.</div>;
  
  
  
const handleLike = async (projectId) => {
  if (!projectId) {
    console.error("Missing projectId");
    return;
  }

  try {
    const token = localStorage.getItem("token"); // Only exists for manual login

    const config = token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {
          withCredentials: true, // For Google OAuth session
        };

    const response = await axios.put(`/api/projects/like/${projectId}`, {}, config);

    if (response.status === 200) {
      console.log("Project liked successfully:", response.data);

      setDisplayedProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId
            ? { ...project, isLiked: !project.isLiked, likes: response.data.likes }
            : project
        )
      );
    }
  } catch (error) {
    if (error.response) {
      console.error("Error liking project (from server):", error.response.data);
    } else if (error.request) {
      console.error("Error liking project (no response):", error.request);
    } else {
      console.error("Error liking project (setup issue):", error.message);
    }
  }
};

  
  return (
    <section className="w-full mt-20 text-darkblue bg-gray-100 pb-6 md:p-4">
      <div className="mx-auto px-4 md:px-24 lg:px-48">
        <h1 className="md:text-3xl pt-4 text-xl font-bold text-center mb-8">
          Interior Design Portfolio
        </h1>

        <div className="flex justify-center md:space-x-4 space-x-3 mb-8">
          {ProjectFilter.map((category) => (
            <button
              key={category.title}
              className={`px-4 py-2 md:text-base text-sm rounded-lg text-white ${
                filter === category.title ? "bg-blue-500" : "bg-gray-400"
              } hover:bg-blue-600 focus:bg-blue-600`}
              onClick={() => setFilter(category.title)}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-4">
          {Array.isArray(displayedProjects) && displayedProjects.length > 0 ? (
            displayedProjects.map((project, projectIndex) => (
              <div
                key={projectIndex}
                className="shadow-custom-dark md:p-4 p-2 rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-92 bg-gray-100">
                  <img
                    src={project.img[currentImageIndices[projectIndex] || 0]}
                    alt={project.title}
                    className="w-full md:h-[400px] h-60 object-contain"
                  />
                  <button
                    onClick={() =>
                      handlePreviousImage(projectIndex, project.img)
                    }
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-blue-500"
                  >
                    <img
                      src="/src/Images/left-arrow.png"
                      alt=""
                      className="w-4 h-4"
                    />
                  </button>
                  <button
                    onClick={() => handleNextImage(projectIndex, project.img)}
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
                          currentImageIndices[projectIndex] === imgIndex
                            ? "border-4 border-blue-500"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentImageIndices((prev) => ({
                            ...prev,
                            [projectIndex]: imgIndex,
                          }))
                        }
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
                    onClick={() => handleLike(project._id)}
                    className="flex items-center gap-1 mt-2"
                    aria-label={
                      project.isLiked ? "Unlike project" : "Like project"
                    }
                  >
                    <LikeButton filled={project.isLiked} />
                    <span>{project.likes || 0}</span>
                  </button>
                </div>
                <div>
                  {displayedProjects.map((project) => (
                    <div key={project._id}>
                      {/* ... other project content ... */}
                      <div></div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
        </div>

        <Popup isOpen={isPopupOpen} onClose={closePopup} />

        {displayedProjects.length < filteredProjects.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreProjects}
              className={`px-6 py-2 text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "More Projects"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDesign;
