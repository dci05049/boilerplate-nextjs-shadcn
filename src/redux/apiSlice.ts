// store/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Adjust base URL as needed
  endpoints: (builder) => ({
    getPosts: builder.query<any, void>({
      query: () => 'posts',
    }),
  }),
});

// Export the auto-generated hook
export const { useGetPostsQuery } = apiSlice;
