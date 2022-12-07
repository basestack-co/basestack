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

interface Environment {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
}

interface Flag {
  slug: string;
  enabled: boolean;
  description?: string;
  environmentId: string;
}

export interface HistoryPayload {
  flag?: Flag | Flag[];
  environment?: Environment | Environment[];
  project?: {
    name: string;
    slug?: string;
  };
}

export interface HistoryData {
  projectId: string;
  payload: HistoryPayload;
}
