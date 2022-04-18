export interface ProjectArgs {
  name: string;
  slug: string;
}

export interface Project extends ProjectArgs {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectsResponse {
  projects: Project[];
}
