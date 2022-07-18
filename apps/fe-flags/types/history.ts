export enum HistoryAction {
  createProject = "CREATE_PROJECT",
  updateProject = "UPDATE_PROJECT",
  createFlag = "CREATE_FLAG",
  updateFlag = "UPDATE_FLAG",
  deleteFlag = "DELETE_FLAG",
  createEnvironment = "CREATE_ENVIRONMENT",
  updateEnvironment = "UPDATE_ENVIRONMENT",
  deleteEnvironment = "DELETE_ENVIRONMENT",
}

export interface HistoryPayload {
  flag?: {
    id: string;
    slug: string;
    enabled: boolean;
  };
  environment?: {
    id: string;
    name?: string;
    slug?: string;
    description?: string;
  };
  project?: {
    name: string;
  };
}

export interface HistoryData {
  projectId: string;
  payload: HistoryPayload;
}
