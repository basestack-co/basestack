import { RouterOutput } from "libs/trpc";

/*
 *
 *  UTILS
 *
 * */

export type RemoveNullAndUndefined<T> = T extends null | undefined
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: RemoveNullAndUndefined<T[K]>;
    }
  : T;

/*
 *
 *  PROJECT
 *
 * */

export type ProjectOutput = RouterOutput["project"]["bySlug"]["project"];
export type Project = RemoveNullAndUndefined<ProjectOutput>;

export interface ProjectSettings {
  project: Project;
}

/*
 *
 *  FLAG
 *
 * */

export type SelectedView = "cards" | "table";

export enum TabType {
  CORE = "core",
  ADVANCED = "advanced",
  HISTORY = "history",
}

/*
 *
 *  HISTORY
 *
 * */

export enum HistoryAction {
  createProject = "CREATE_PROJECT",
  updateProject = "UPDATE_PROJECT",
  createFlag = "CREATE_FLAG",
  updateFlag = "UPDATE_FLAG",
  deleteFlag = "DELETE_FLAG",
  createEnvironment = "CREATE_ENVIRONMENT",
  updateEnvironment = "UPDATE_ENVIRONMENT",
  deleteEnvironment = "DELETE_ENVIRONMENT",
}

export interface Environment {
  id: string;
  name?: string;
  slug?: string;
  description?: string;
  enabled?: boolean;
}
