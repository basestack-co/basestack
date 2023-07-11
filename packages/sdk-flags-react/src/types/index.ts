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

export type FlagResult<T> = T extends null ? FlagNotFoundError : Flag;

export interface SDK {
  isInitialized: boolean;
  initialize(): Promise<void>;
  flagsAsync(): Promise<Flag[]>;
  flagAsync(name: string): Promise<FlagResult<Flag | null>>;
  flags(): Flag[];
  flag(name: string): FlagResult<Flag | null>;
}
