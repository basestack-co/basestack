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
    name: string;
  };
  user: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface History {
  id: string;
  projectId: string;
  action: string;
  payload: HistoryPayload;
  createdAt: Date;
  updatedAt: Date;
}

export interface HistoryResponse {
  history: History[];
}

export interface GetHistoryArgs {
  projectId: string;
  query?: {
    flagId?: string;
  };
}

export interface CreateHistoryArgs {
  projectId: string;
  action: HistoryAction;
  payload: HistoryPayload;
}
