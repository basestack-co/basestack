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
      Partial<{ projectId: string }>
    >({
      query: ({ projectId }) => `/projects/${projectId}/environments`,
      providesTags: ["Environments"],
    }),
    createEnvironment: builder.mutation<void, Partial<EnvironmentArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Environments"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetEnvironmentsQuery, useCreateEnvironmentMutation } =
  environmentsApi;
