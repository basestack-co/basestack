export interface Flag {
  slug: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  error: boolean;
}

export interface FlagNotFoundError {
  enabled: boolean;
  error: boolean;
  message: string;
}

// export type FlagResult = Flag | FlagNotFoundError;

export type FlagResult<T> = T extends null ? FlagNotFoundError : Flag;

export interface Params {
  apiUrl: string;
  projectKey: string;
  envKey: string;
}
