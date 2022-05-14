export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface GetUsersByProjectArgs {
  projectId: string;
}

export interface UsersByProjectResponse {
  users: User[];
}
