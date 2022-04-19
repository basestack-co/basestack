// Queries
import { baseApi } from "./base";
// Types
import {
  EnvironmentsResponse,
  EnvironmentArgs,
} from "types/query/environments";

// Define environments service using BASE API URL and endpoints
export const environmentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEnvironments: builder.query<
      EnvironmentsResponse,
      Partial<EnvironmentArgs>
    >({
      query: ({ projectId }) => `/projects/${projectId}/environments`,
      providesTags: ["Environments"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetEnvironmentsQuery } = environmentsApi;
