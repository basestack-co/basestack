// Store
import { AppDispatch } from "store";
// Queries
import { baseApi } from "./base";
// Types
import {
  History,
  HistoryResponse,
  GetHistoryArgs,
  CreateHistoryArgs,
  HistoryAction,
  HistoryPayload,
} from "types/query/history";
// Utils
import { urlQueryBuilder } from "utils/functions";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
// Auth
import { getSession } from "next-auth/react";

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

// Util function to create history record
export const createHistoryRecord = async (
  dispatch: AppDispatch,
  projectId: string,
  action: HistoryAction,
  payload: HistoryPayload
) => {
  const session = await getSession();

  return await dispatch(
    historyApi.endpoints.createHistory.initiate({
      projectId,
      action,
      payload: {
        user: {
          id: get(session, "user.id", "") as string,
          name: get(session, "user.name", "") as string,
          avatar: get(session, "user.avatar", "") as string,
        },
        ...payload,
      },
    })
  );
};

// auto-generated based on the defined endpoints
export const { useGetHistoryQuery, useCreateHistoryMutation } = historyApi;
