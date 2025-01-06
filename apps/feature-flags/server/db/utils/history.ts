import { PrismaClient } from ".prisma/client";
// Auth
import { Session } from "next-auth";
// Types
import { HistoryAction, Environment } from "types";
import { Type } from "components/HistoryCard/types";
import { RouterOutputs } from "utils/trpc/react";

export const pathActionMap: { [id: string]: string } = {
  "project.create": HistoryAction.createProject,
  "project.update": HistoryAction.updateProject,
  "environment.create": HistoryAction.createEnvironment,
  "environment.update": HistoryAction.updateEnvironment,
  "environment.delete": HistoryAction.deleteEnvironment,
  "flag.create": HistoryAction.createFlag,
  "flag.update": HistoryAction.updateFlag,
  "flag.delete": HistoryAction.deleteFlag,
};

export const typeMap: { [id: string]: Type } = {
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
  type: Type;
  environments: Environment[];
}

const createFlagPayload = (
  data: FlagData,
  input: FlagInput,
  path: string,
): FlagPayload => {
  const isDelete = path === "flag.delete";
  const { flags } = data;
  const { environments, flagSlug } = input;

  const content: FlagContent = isDelete
    ? { slug: "", description: "" }
    : flags[0] || { slug: "", description: "" };

  const ids = !isDelete ? flags.map(({ id }) => id) : [];

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
    case "project.create":
    case "project.update":
    case "project.delete":
      return createProjectPayload(data);

    case "environment.create":
    case "environment.update":
    case "environment.delete":
      return createEnvironmentPayload(data);

    case "flag.create":
    case "flag.update":
    case "flag.delete":
      return createFlagPayload(data, input, path);

    default:
      return {};
  }
};

export const createHistory = async (
  prisma: PrismaClient,
  session: Session,
  path: string,
  data: any,
  input: any,
) => {
  const action = pathActionMap[path];

  if (!action) return;

  let projectId =
    path === "project.create" ? data.project.id : (input.projectId ?? "");

  if (!projectId) return;

  const payload = createPayload(path, data, input);

  await prisma.history.create({
    data: {
      action,
      payload: {
        user: {
          id: session.user.id,
          name: session.user.name,
          avatar: session.user.image ?? "",
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
  item: RouterOutputs["history"]["all"]["history"][0],
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
