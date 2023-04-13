import { RouterOutput } from "libs/trpc";
import { Role } from "@prisma/client";

/*
 *
 *  PROJECT
 *
 * */

export type ProjectOutput = RouterOutput["project"]["bySlug"]["project"];
export type ProjectRole = Role;
export type Project = ProjectOutput | null;

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
}

export interface HistoryPayload {
  flag?: {
    slug: string;
    description?: string;
    ids: string[];
    environments: Array<{ id: string; enabled: boolean; name: string }>;
  };
  environment?: Environment | Environment[];
  project?: {
    name: string;
    slug?: string;
  };
}

export interface HistoryData {
  projectId: string;
  payload: HistoryPayload;
}
