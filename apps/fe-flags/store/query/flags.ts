// Queries
import { baseApi } from "./base";
// Types
import {
  FlagResponse,
  FlagsResponse,
  FlagArgs,
  CreateFlagArgs,
  FlagByIdArgs,
  FlagByIdResponse,
  UpdateFlagArgs,
  DeleteFlagArgs,
  FlagsByProjectArgs,
  FlagsByProjectResponse,
} from "types/query/flags";
import { HistoryAction } from "types/query/history";
// Utils
import { createHistoryRecord } from "./history";
import get from "lodash.get";
import isEmpty from "lodash.isempty";
import { urlQueryBuilder } from "utils/functions";

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
    getAllFlagsByProject: builder.query<
      FlagsByProjectResponse,
      Partial<FlagsByProjectArgs>
    >({
      query: ({ projectId, pagination = {} }) =>
        `/projects/${projectId}/flags${
          isEmpty(pagination) ? "" : "?"
        }${urlQueryBuilder(pagination)}`,
      providesTags: ["FlagsByProject"],
    }),
    getFlagById: builder.query<FlagByIdResponse, Partial<FlagByIdArgs>>({
      query: ({ projectId, envId, flagId }) =>
        `/projects/${projectId}/environments/${envId}/flags/${flagId}`,
      providesTags: ["Flags"],
    }),
    createFlag: builder.mutation<FlagResponse, Partial<CreateFlagArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments/${data.envId}/flags`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Flags"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Flag creation
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.createFlag,
              payload: {
                flag: {
                  id: get(result, "data.flag.id", ""),
                  slug: get(result, "data.flag.slug", ""),
                  enabled: get(result, "data.flag.enabled", false),
                },
                environment: {
                  id: get(result, "body.envId", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("create flag error", err);
        }
      },
    }),
    updateFlagById: builder.mutation<FlagResponse, Partial<UpdateFlagArgs>>({
      query: (data) => ({
        url: `/projects/${data.projectId}/environments/${data.envId}/flags/${data.flagId}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Flags"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Flag update
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.updateFlag,
              payload: {
                flag: {
                  id: get(result, "data.flag.id", ""),
                  slug: get(result, "data.flag.slug", ""),
                  enabled: get(result, "data.flag.enabled", false),
                },
                environment: {
                  id: get(result, "body.envId", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("update flag error", err);
        }
      },
    }),
    deleteFlagById: builder.mutation<FlagResponse, Partial<DeleteFlagArgs>>({
      query: ({ projectId, envId, flagId }) => ({
        url: `/projects/${projectId}/environments/${envId}/flags/${flagId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Flags"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            // creates history record for Flag delete
            await createHistoryRecord({
              dispatch,
              projectId: get(body, "projectId", ""),
              action: HistoryAction.deleteFlag,
              payload: {
                flag: {
                  id: get(result, "data.flag.id", ""),
                  slug: get(result, "data.flag.slug", ""),
                  enabled: get(result, "data.flag.enabled", false),
                },
                environment: {
                  id: get(result, "body.envId", ""),
                },
              },
            });
          }
        } catch (err) {
          console.log("delete flag error", err);
        }
      },
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const {
  useGetFlagsQuery,
  useCreateFlagMutation,
  useGetFlagByIdQuery,
  useUpdateFlagByIdMutation,
  useDeleteFlagByIdMutation,
  useGetAllFlagsByProjectQuery,
} = flagsApi;
