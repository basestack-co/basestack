import { PrismaClient } from ".prisma/client";
import { HistoryType } from "@basestack/ui";
// Auth
import { User } from "better-auth";
// Types
import { Environment, HistoryAction } from "types";
import { RouterOutputs } from "utils/trpc/react";

export const pathActionMap: { [id: string]: string } = {
  "projects.create": HistoryAction.createProject,
  "projects.update": HistoryAction.updateProject,
  "projectEnvironments.create": HistoryAction.createEnvironment,
  "projectEnvironments.update": HistoryAction.updateEnvironment,
  "projectEnvironments.delete": HistoryAction.deleteEnvironment,
  "projectFlags.create": HistoryAction.createFlag,
  "projectFlags.update": HistoryAction.updateFlag,
  "projectFlags.delete": HistoryAction.deleteFlag,
};

export const typeMap: { [id: string]: HistoryType } = {
  [HistoryAction.createProject]: "createdProject",
  [HistoryAction.updateProject]: "edited",
  [HistoryAction.createEnvironment]: "created",
  [HistoryAction.updateEnvironment]: "edited",
  [HistoryAction.deleteEnvironment]: "deleted",
  [HistoryAction.createFlag]: "created",
  [HistoryAction.updateFlag]: "edited",
  [HistoryAction.deleteFlag]: "deleted",
};

export const descriptionMap: { [id: string]: string } = {
  [HistoryAction.createProject]: "created the project",
  [HistoryAction.updateProject]: "updated the project",
  [HistoryAction.createEnvironment]: "created the environment",
  [HistoryAction.updateEnvironment]: "updated the environment",
  [HistoryAction.deleteEnvironment]: "deleted the environment",
  [HistoryAction.createFlag]: "created the flag",
  [HistoryAction.updateFlag]: "updated the flag",
  [HistoryAction.deleteFlag]: "deleted the flag",
};

export interface FlagPayload {
  flag: {
    slug: string;
    description: string;
    ids: string[];
    environments: string[];
  };
}

export interface FlagData {
  flags: { id: string; slug: string; description: string }[];
}

export interface FlagInput {
  environments: string[];
  flagSlug: string;
}

export interface FlagContent {
  slug: string;
  description: string;
}

export interface HistoryItemDetails {
  user: string;
  avatar: string;
  description: string;
  slug: string;
  createdAt: string | Date;
  type: HistoryType;
  environments: Environment[];
}

const createFlagPayload = (
  data: FlagData,
  input: FlagInput,
  path: string,
): FlagPayload => {
  const isDelete = path === "projectFlags.delete";
  const { flags } = data;
  const { environments, flagSlug } = input;

  const content: FlagContent = isDelete
    ? { slug: "", description: "" }
    : flags[0] || { slug: "", description: "" };

  const ids = !isDelete ? flags?.map(({ id }) => id) : [];

  return {
    flag: {
      ids,
      slug: isDelete ? flagSlug : content.slug,
      description: content.description,
      environments: isDelete ? [] : environments,
    },
  };
};

export const createEnvironmentPayload = (data: any) => {
  return {
    environment: data.environment ?? {},
  };
};

export const createProjectPayload = (data: any) => {
  return {
    project: data.project ?? {},
  };
};

export const createPayload = (path: string, data: any, input: any) => {
  switch (path) {
    case "projects.create":
    case "projects.update":
    case "projects.delete":
      return createProjectPayload(data);

    case "projectEnvironments.create":
    case "projectEnvironments.update":
    case "projectEnvironments.delete":
      return createEnvironmentPayload(data);

    case "projectFlags.create":
    case "projectFlags.update":
    case "projectFlags.delete":
      return createFlagPayload(data, input, path);

    default:
      return {};
  }
};

export interface HistoryEventData {
  prisma: PrismaClient;
  user: User;
  path: string;
  data: any;
  input: any;
}

export const createHistory = async ({
  prisma,
  user,
  path,
  data,
  input,
}: HistoryEventData) => {
  const action = pathActionMap[path];

  if (!action) return;

  const projectId =
    path === "projects.create" ? data.project.id : (input.projectId ?? "");

  if (!projectId) return;

  const payload = createPayload(path, data, input);

  await prisma.history.create({
    data: {
      action,
      payload: {
        user: {
          id: user.id,
          name: user.name,
          avatar: user.image ?? "",
        },
        ...payload,
      },
      project: {
        connect: {
          id: projectId,
        },
      },
    },
  });
};

export const getHistoryItemDetails = (
  item: RouterOutputs["projectHistory"]["list"]["history"][0],
): HistoryItemDetails => {
  const { payload, action, createdAt } = item;
  const { user, flag } = payload as any;
  const { name, avatar } = user;
  const { slug, environments } = flag;

  const description = descriptionMap[action] ?? "";
  const type = typeMap[action] ?? "created";

  return {
    user: name,
    avatar,
    description,
    slug,
    createdAt,
    type,
    environments,
  };
};
