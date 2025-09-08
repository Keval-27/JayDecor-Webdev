import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteProjectMutation, useFetchAllProjectsQuery } from '../../../Redux/Features/Projects/projectsApi';

const ManageProjects = () => {
    const navigate = useNavigate();
    const { data: projectsData = {}, refetch, isLoading, isError, error } = useFetchAllProjectsQuery();

    const [deleteProject] = useDeleteProjectMutation();

    // Extract projects array from the fetched data
    const projects = projectsData.projects || [];

    // Debugging: Log fetched projects
    console.log('Projects:', projects);

    // Handle deleting a project
    const handleDeleteProject = async (id) => {
        try {
            await deleteProject(id).unwrap();
            alert('Project deleted successfully!');
            refetch();
        } catch (error) {
            console.error('Failed to delete Project:', error.message);
            alert('Failed to delete Project. Please try again.');
        }
    };

    // Handle navigating to Edit Project page
    const handleEditClick = (id) => {
        navigate(`/dashboard/edit-project/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>; // Show loading state
    }

    if (isError) {
        return <div>Error: {error.message}</div>; // Show error state
    }

    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700 text-center">All Projects</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                         
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Project Title
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Type
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Description
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Images
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {projects && projects.length > 0 ? (
                                    projects.map((project, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {project.title}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {project.type}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {project.desc}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {project.img && project.img.length > 0 ? (
                                                    <div className="flex space-x-2">
                                                        {project.img.slice(0, 3).map((image, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={image}
                                                                alt={`Project Image ${idx + 1}`}
                                                                className="w-10 h-10 object-cover rounded"
                                                            />
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span>No images available</span>
                                                )}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">
                                                <Link
                                                    to={`/dashboard/edit-project/${project._id}`}
                                                    className="font-medium text-indigo-600 hover:text-indigo-700 mr-2 hover:underline underline-offset-2"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProject(project._id)}
                                                    className="font-medium bg-red-500 py-1 px-4 rounded-full text-white mr-2"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No projects available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManageProjects;
