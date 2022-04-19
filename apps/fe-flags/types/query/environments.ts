export interface EnvironmentArgs {
  name: string;
  projectId: string;
  slug: string;
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
