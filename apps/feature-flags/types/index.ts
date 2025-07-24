import type { RemoveNullAndUndefined } from "@basestack/utils";
import { RouterOutputs } from "utils/trpc/react";

/*
 *
 *  PROJECT
 *
 * */

export type ProjectOutput = RouterOutputs["projects"]["byId"];
export type Project = RemoveNullAndUndefined<ProjectOutput>;

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
