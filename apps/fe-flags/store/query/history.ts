// Queries
import { baseApi } from "./base";
// Types
import { HistoryResponse, HistoryArgs } from "types/query/history";
// Utils
import { urlQueryBuilder } from "utils/functions";
import isEmpty from "lodash.isempty";

// Define history service using BASE API URL and endpoints
export const historyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query<HistoryResponse, Partial<HistoryArgs>>({
      query: ({ projectId, query = {} }) => {
        const queryString = isEmpty(query) ? "" : `?${urlQueryBuilder(query)}`;
        return `/projects/${projectId}/history${queryString}`;
      },
      providesTags: ["History"],
    }),
    /* getFlagById: builder.query<FlagByIdResponse, Partial<FlagByIdArgs>>({
      query: ({ projectId, envId, flagId }) =>
        `/projects/${projectId}/environments/${envId}/flags/${flagId}`,
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
    updateFlagById: builder.mutation<void, Partial<UpdateFlagArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments/${data.envId}/flags/${data.flagId}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Flags"],
    }),
    deleteFlagById: builder.mutation<void, Partial<DeleteFlagArgs>>({
      query: ({ projectId, envId, flagId }) => ({
        url: `/projects/${projectId}/environments/${envId}/flags/${flagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Flags"],
    }), */
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetHistoryQuery } = historyApi;
