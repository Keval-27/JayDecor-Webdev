import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../Utils/baseURL';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/projects/`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const projectsApi = createApi({
  reducerPath: 'projectsApi', // Optional: name of the slice
  baseQuery,
  tagTypes: ['Projects'], // Tags for cache invalidation
  endpoints: (builder) => ({

    // for getting All Projects

    fetchAllProjects: builder.query({
      query: () => "/", // Adjust endpoint if needed (e.g., 'all' instead of '/')
      providesTags: ["Projects"], // Cache tag
    }),

    // For getting one project
    fetchProjectById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
  }),

  // For Adding a new project

  addProject: builder.mutation({
      query: (newProject) => ({
          url: `/create-project`,
          method: "POST",
          body: newProject
      }),
      invalidatesTags: ["Projects"]
  }),
  
  // For Updating a  project
  updateProject: builder.mutation({
      query: ({id, ...rest}) => ({
          url: `/update/${id}`,
          method: "PUT",
          body: rest,
          headers: {
              'Content-Type': 'application/json'
          }
      }),
      invalidatesTags: ["Projects"]
  }),

  // For Deleting a  project
  deleteProject: builder.mutation({
      query: (id) => ({
          url: `/${id}`,
          method: "DELETE"
      }),
      invalidatesTags: ["Projects"]
  }),

  
  likeProject: builder.mutation({
    query: (projectId) => ({
      url: `/like/${projectId}`,
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    invalidatesTags: ['LikedProjects']
  }),
  
  fetchLikedProjects: builder.query({
    query: () => "liked/dashboard",
    providesTags: ["LikedProjects"],
  }),
  

  }),
});



export const {useFetchAllProjectsQuery, useFetchProjectByIdQuery, useAddProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation,useFetchLikedProjectsQuery,useLikeProjectMutation} = projectsApi;
export default projectsApi;
