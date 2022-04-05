// Queries
import { baseApi } from "./base";
// Types
import { ProjectsResponse } from "types/query/projects";

// Define Projects service using BASE API URL and endpoints
const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectsResponse, void>({
      query: () => `/projects`,
      providesTags: ["Projects"],
      /* transformResponse: (response: { data: ProjectsResponse }) => {
        return response.data;
      }, */
    }),
  }),
  overrideExisting: false,
});

// auto-generated based on the defined endpoints
export const { useGetProjectsQuery } = projectsApi;
