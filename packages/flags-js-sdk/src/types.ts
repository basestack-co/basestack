export interface Flag {
  slug: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  description: string;
}

export interface FlagsResponse {
  flags: Flag[];
}

export interface Params {
  apiUrl: string;
  projectKey: string;
  envKey: string;
}
