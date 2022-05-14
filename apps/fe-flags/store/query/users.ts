// Queries
import { baseApi } from "./base";
// Types
import {
  UsersByProjectResponse,
  GetUsersByProjectArgs,
} from "types/query/users";

// Define users service using BASE API URL and endpoints
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersByProject: builder.query<
      UsersByProjectResponse,
      Partial<GetUsersByProjectArgs>
    >({
      query: ({ projectId }) => {
        return `/projects/${projectId}/users`;
      },
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetUsersByProjectQuery } = usersApi;
