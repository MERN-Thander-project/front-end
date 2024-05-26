import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4444/",
  prepareHeaders: (headers, { getState }) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery,
  refetchOnMountOrArgChange: 5,
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => `/posts`,
      providesTags: ["Posts"],
    }),
    getOnePost: builder.query({
      query: (name) => `/posts/${name}`,
      providesTags: ["Post"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    authMe: builder.query({
      query: () => `/auth/me`,
    }),
    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("image", file);
        return {
          url: "/upload",
          method: "POST",
          body: formData,
        };
      },
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts", "Post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetOnePostQuery,
  useLoginMutation,
  useAuthMeQuery,
  useRegisterMutation,
  useUploadImageMutation,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApi;