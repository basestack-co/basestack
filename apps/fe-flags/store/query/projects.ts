// Queries
import { baseApi } from "./base";
// Types
import { ProjectsResponse, ProjectArgs } from "types/query/projects";

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
      /* async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            setToast({
              type: "success"
              title: "message"
            })
          );
        } catch (err) {
          handleErrorToast(err as UserErrorResponse, dispatch);
        }
      }, */
      invalidatesTags: ["Projects"],
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
