import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tegsApi = createApi({
  reducerPath: 'tegsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4444/' }),
  endpoints: (builder) => ({
    getAllTegs: builder.query({
      query: (name) => `/tags`,
    }),
    
  }),
});

export const { useGetAllTegsQuery } = tegsApi;