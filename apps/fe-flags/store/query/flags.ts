// Queries
import { baseApi } from "./base";
// Types
import { FlagsResponse, FlagArgs, CreateFlagArgs } from "types/query/flags";
// Utils
import { urlQueryBuilder } from "utils/functions";
import isEmpty from "lodash.isempty";

// Define flags service using BASE API URL and endpoints
export const flagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFlags: builder.query<FlagsResponse, Partial<FlagArgs>>({
      query: ({ projectId, envId, pagination = {} }) =>
        `/projects/${projectId}/environments/${envId}/flags${
          isEmpty(pagination) ? "" : "?"
        }${urlQueryBuilder(pagination)}`,
      providesTags: ["Flags"],
    }),
    createFlag: builder.mutation<void, Partial<CreateFlagArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments/${data.envId}/flags`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Flags"],
    }),

    /*
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
    }), */
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetFlagsQuery, useCreateFlagMutation } = flagsApi;
