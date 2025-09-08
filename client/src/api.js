import axios from 'axios';

// API endpoint for liking a project
const LIKE_PROJECT_URL = '/api/projects/like';

// Function to like a project
export const likeProject = async (projectId) => {
  try {
    const response = await axios.post(LIKE_PROJECT_URL, { projectId });
    return response.data;
  } catch (error) {
    console.error('Error liking project:', error);
    throw error;
  }
};