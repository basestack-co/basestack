export interface Flag {
  slug: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  description: string;
  error: boolean;
}

export interface SDKType {
  isInitialized: boolean;
  initialize: () => Promise<boolean>;
  flagsAsync: () => Promise<Flag[]>;
  flagAsync: (name: string) => Promise<Flag>;
  flags: () => Flag[];
  flag: (name: string) => Flag;
}
