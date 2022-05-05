import { Pagination } from "./generic";
import { Environment } from "./environments";

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

export interface FlagResponse {
  flag: Flag;
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

export interface FlagByIdArgs {
  projectId: string;
  envId: string;
  flagId: string;
}

export interface FlagByIdResponse extends Flag {
  environment: Environment;
}

export interface UpdateFlagArgs {
  flagId: string;
  envId: string;
  projectId: string;
  enabled: boolean;
  payload?: any;
  expiredAt?: Date;
  description?: string;
}

export interface DeleteFlagArgs {
  flagId: string;
  envId: string;
  projectId: string;
}
