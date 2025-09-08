import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../Utils/baseURL';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/designs/`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const designsApi = createApi({
  reducerPath: 'designsApi', 
    baseQuery,
  tagTypes: ['Designs'], // Tags for cache invalidation
  endpoints: (builder) => ({


    // for getting All Designs
    fetchAllDesigns: builder.query({
      query: () => "/", 
      providesTags: ["Designs"], // Cache tag
    }),

    // For getting one Design
    fetchDesignById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Designs", id }],
  }),


  // For Adding a new Designs
  addDesign: builder.mutation({
      query: (newDesign) => ({
          url: `/create-design`,
          method: "POST",
          body: newDesign
      }),
      invalidatesTags: ["Designs"]
  }),
  
  // For Updating a  Designs  
  updateDesign: builder.mutation({
      query: ({id, ...rest}) => ({
          url: `/update/${id}`,
          method: "PUT",
          body: rest,
          headers: {
              'Content-Type': 'application/json'
          }
      }),
      invalidatesTags: ["Designs"]
  }),

  // For Deleting a  Design
  deleteDesign: builder.mutation({
      query: (id) => ({
          url: `/${id}`,
          method: "DELETE"
      }),
      invalidatesTags: ["Designs"]
  }),

  }),
});



export const {useFetchAllDesignsQuery, useFetchDesignByIdQuery, useAddDesignMutation, useUpdateDesignMutation, useDeleteDesignMutation} = designsApi;
export default designsApi;
