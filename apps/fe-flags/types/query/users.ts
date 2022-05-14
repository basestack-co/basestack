export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface GetUsersByProjectArgs {
  projectId: string;
}

export interface GetUsersBySearchArgs {
  name: string;
}

export interface UsersResponse {
  users: User[];
}
