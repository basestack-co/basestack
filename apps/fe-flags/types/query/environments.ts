export interface Environment {
  id: string;
  name: string;
  projectId: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
}

export interface EnvironmentResponse {
  environment: Environment;
}

export interface EnvironmentsResponse {
  environments: Environment[];
}

export interface EnvironmentArgs {
  projectId: string;
}
