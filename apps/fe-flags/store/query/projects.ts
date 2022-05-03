// Queries
import { baseApi } from "./base";
// Types
import {
  ProjectsResponse,
  ProjectArgs,
  ProjectResponse,
  UpdateProjectArgs,
  DeleteProjectArgs,
} from "types/query/projects";
import { HistoryAction } from "types/query/history";
// Utils
import { createHistoryRecord } from "./history";
import get from "lodash.get";
import isEmpty from "lodash.isempty";

// Define Projects service using BASE API URL and endpoints
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, void>({
      query: () => `/projects`,
      providesTags: ["Projects"],
      /* transformResponse: (response: { data: ProjectsResponse }) => {
        return response.data;
      }, */
    }),
    createProject: builder.mutation<void, Partial<ProjectArgs>>({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: JSON.stringify(data),
      }),
      async onQueryStarted(
        body,
        { dispatch, queryFulfilled, getState, ...rest }
      ) {
        try {
          const result = await queryFulfilled;

          if (!isEmpty(result)) {
            const projectId = get(result, "data.project.id", "");
            // creates history record for project creation
            await createHistoryRecord(
              dispatch,
              projectId,
              HistoryAction.createProject,
              {
                project: {
                  name: get(result, "data.project.name", ""),
                },
              }
            );
          }
        } catch (err) {
          console.log("create project error", err);
        }
      },
      invalidatesTags: ["Projects"],
    }),
    getProjectById: builder.query<ProjectResponse, { projectId: string }>({
      query: ({ projectId }) => `/projects/${projectId}`,
      providesTags: ["Projects"],
    }),
    updateProjectById: builder.mutation<void, Partial<UpdateProjectArgs>>({
      query: ({ projectId, ...data }) => ({
        url: `/projects/${projectId}`,
        method: "PUT",
        body: JSON.stringify(data),
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProjectById: builder.mutation<void, Partial<DeleteProjectArgs>>({
      query: ({ projectId }) => ({
        url: `/projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectByIdMutation,
  useDeleteProjectByIdMutation,
} = projectsApi;
