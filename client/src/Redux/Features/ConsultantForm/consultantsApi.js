import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../Utils/baseURL';

const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

// Configure base query with a dynamic baseUrl
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/Consultants/`,
  credentials: 'include',
  prepareHeaders,
});

// Define the API using createApi
const consultantsApi = createApi({
  reducerPath: 'consultantsApi',
  baseQuery,
  tagTypes: ['Consultants'], // Tags for cache management
  endpoints: (builder) => ({
    // POST: Create a new contact message
    createConsultantMessage: builder.mutation({
      query: (newConsultantMessage) => ({
        url: '/',
        method: 'POST',
        body: newConsultantMessage,
      }),
      invalidatesTags: ['Consultants'], // Invalidate cache when creating a new message
    }),

    // GET: Fetch all contact messages
    getConsultantMessages: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Consultants'], // Provide cache tags for GET
    }),
  }),
});

// Export the auto-generated hook for the `getContactMessages` query
export const { useGetConsultantMessagesQuery, useCreateConsultantMessageMutation } = consultantsApi;

export default consultantsApi;