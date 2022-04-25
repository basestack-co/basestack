import { Pagination } from "./generic";

export interface Flag {
  id: string;
  slug: string;
  environmentId: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlagsResponse {
  flags: Flag[];
}

export interface FlagArgs {
  projectId: string;
  envId: string;
  pagination?: Pagination;
}

export interface CreateFlagArgs {
  projectId: string;
  envId: string;
  slug: string;
  enabled: boolean;
  payload?: any;
  expiredAt?: Date;
  description?: string;
}
