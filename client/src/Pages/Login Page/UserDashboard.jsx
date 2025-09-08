import { useFetchLikedProjectsQuery } from "../../Redux/Features/Projects/projectsApi";
import ProjectCard from "../../Components/ProjectCard";

const UserDashboard = () => {
  const { data: likedData, isLoading } = useFetchLikedProjectsQuery();

  const likedIds = new Set(likedData?.likedProjects?.map(p => p._id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Liked Projects</h2>
      {likedData?.likedProjects?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {likedData.likedProjects.map(project => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p>You haven't liked any projects yet.</p>
      )}
    </div>
  );
};

export default UserDashboard;
