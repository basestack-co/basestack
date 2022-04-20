// Queries
import { baseApi } from "./base";
// Types
import {
  EnvironmentsResponse,
  EnvironmentArgs,
  UpdateEnvironmentArgs,
  DeleteEnvironmentArgs,
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
    updateEnvironmentById: builder.mutation<
      void,
      Partial<UpdateEnvironmentArgs>
    >({
      query: ({ projectId, environmentId, ...data }) => ({
        url: `/projects/${projectId}/environments/${environmentId}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Environments"],
    }),
    deleteEnvironmentById: builder.mutation<
      void,
      Partial<DeleteEnvironmentArgs>
    >({
      query: ({ projectId, environmentId }) => ({
        url: `/projects/${projectId}/environments/${environmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Environments"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const {
  useGetEnvironmentsQuery,
  useCreateEnvironmentMutation,
  useUpdateEnvironmentByIdMutation,
  useDeleteEnvironmentByIdMutation,
} = environmentsApi;
