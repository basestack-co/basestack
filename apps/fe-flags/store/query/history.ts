// Queries
import { baseApi } from "./base";
// Types
import {
  History,
  HistoryResponse,
  GetHistoryArgs,
  CreateHistoryArgs,
} from "types/query/history";
// Utils
import { urlQueryBuilder } from "utils/functions";
import isEmpty from "lodash.isempty";

// Define history service using BASE API URL and endpoints
export const historyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query<HistoryResponse, Partial<GetHistoryArgs>>({
      query: ({ projectId, query = {} }) => {
        const queryString = isEmpty(query) ? "" : `?${urlQueryBuilder(query)}`;
        return `/projects/${projectId}/history${queryString}`;
      },
      providesTags: ["History"],
    }),
    createHistory: builder.mutation<History, Partial<CreateHistoryArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/history`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["History"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetHistoryQuery, useCreateHistoryMutation } = historyApi;
