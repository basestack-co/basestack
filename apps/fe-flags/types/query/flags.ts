import { Pagination } from "./generic";

export interface Flag {
  id: string;
  slug: string;
  environmentId: string;
  enabled: boolean;
  payload?: unknown;
  expiredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlagsResponse {
  flags: Flag[];
}

export interface FlagArgs {
  projectId: string;
  envId: string;
  pagination?: Pagination;
}
