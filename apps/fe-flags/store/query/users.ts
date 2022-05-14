// Queries
import { baseApi } from "./base";
// Types
import {
  UsersResponse,
  GetUsersByProjectArgs,
  GetUsersBySearchArgs,
} from "types/query/users";

// Define users service using BASE API URL and endpoints
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersByProject: builder.query<
      UsersResponse,
      Partial<GetUsersByProjectArgs>
    >({
      query: ({ projectId }) => {
        return `/projects/${projectId}/users`;
      },
      providesTags: ["Users"],
    }),
    getUsersBySearch: builder.query<
      UsersResponse,
      Partial<GetUsersBySearchArgs>
    >({
      query: ({ name }) => {
        return `/users?name=${name}`;
      },
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetUsersByProjectQuery, useGetUsersBySearchQuery } = usersApi;
