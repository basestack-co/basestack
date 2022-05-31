// Queries
import { baseApi } from "./base";
// Types
import {
  EnvironmentsResponse,
  EnvironmentArgs,
  UpdateEnvironmentArgs,
  DeleteEnvironmentArgs,
  EnvironmentResponse,
} from "types/query/environments";
import { HistoryAction } from "types/query/history";
// Utils
import { createHistoryRecord } from "./history";
import get from "lodash.get";
import isEmpty from "lodash.isempty";

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
    createEnvironment: builder.mutation<
      EnvironmentResponse,
      Partial<EnvironmentArgs>
    >({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Environments"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Environment creation
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.createEnvironment,
              payload: {
                environment: {
                  id: get(result, "data.environment.id", ""),
                  name: get(result, "data.environment.slug", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("create environment error", err);
        }
      },
    }),
    updateEnvironmentById: builder.mutation<
      EnvironmentResponse,
      Partial<UpdateEnvironmentArgs>
    >({
      query: ({ projectId, environmentId, ...data }) => ({
        url: `/projects/${projectId}/environments/${environmentId}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Environments"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Environment update
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.updateEnvironment,
              payload: {
                environment: {
                  id: get(result, "data.environment.id", ""),
                  name: get(result, "data.environment.slug", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("update environment error", err);
        }
      },
    }),
    deleteEnvironmentById: builder.mutation<
      EnvironmentResponse,
      Partial<DeleteEnvironmentArgs>
    >({
      query: ({ projectId, environmentId }) => ({
        url: `/projects/${projectId}/environments/${environmentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Environments"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Environment delete
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.deleteEnvironment,
              payload: {
                environment: {
                  id: get(result, "data.environment.id", ""),
                  name: get(result, "data.environment.slug", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("delete environment error", err);
        }
      },
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
