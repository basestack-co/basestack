export interface EnvironmentArgs {
  name: string;
  projectId: string;
  slug: string;
  description?: string;
}

export interface Environment extends EnvironmentArgs {
  id: string;
  updatedAt: string;
  createdAt: string;
}

export interface EnvironmentResponse {
  environment: Environment;
}

export interface EnvironmentsResponse {
  environments: Environment[];
}

export interface UpdateEnvironmentArgs {
  projectId: string;
  environmentId: string;
  name: string;
  description?: string;
}

export interface DeleteEnvironmentArgs {
  projectId: string;
  environmentId: string;
}
