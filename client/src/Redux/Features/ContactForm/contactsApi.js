import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../Utils/baseURL';

// Utility function to prepare the headers with the token
const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

// Configure base query with a dynamic baseUrl
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/contacts/`,
  credentials: 'include',
  prepareHeaders,
});

// Define the API using createApi
const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery,
  tagTypes: ['Contacts'], // Tags for cache management
  endpoints: (builder) => ({
    // POST: Create a new contact message
    createContactMessage: builder.mutation({
      query: (newContactMessage) => ({
        url: '/',
        method: 'POST',
        body: newContactMessage,
      }),
      invalidatesTags: ['Contacts'], // Invalidate cache when creating a new message
    }),

    // GET: Fetch all contact messages
    getContactMessages: builder.query({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Contacts'], // Provide cache tags for GET
    }),
  }),
});

// Export the auto-generated hook for the `getContactMessages` query
export const { useGetContactMessagesQuery, useCreateContactMessageMutation } = contactsApi;

export default contactsApi;
