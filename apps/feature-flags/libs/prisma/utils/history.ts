import { PrismaClient } from "@prisma/client";
// Auth
import { Session } from "next-auth";
// Utils
import { getValue } from "@basestack/utils";
// Types
import { HistoryAction } from "types/history";

export const getPathAction: { [id: string]: string } = {
  "project.create": HistoryAction.createProject,
  "project.update": HistoryAction.updateProject,
  "environment.create": HistoryAction.createEnvironment,
  "environment.update": HistoryAction.updateEnvironment,
  "environment.delete": HistoryAction.deleteEnvironment,
  "flag.create": HistoryAction.createFlag,
  "flag.update": HistoryAction.updateFlag,
  "flag.delete": HistoryAction.deleteFlag,
};

interface FlagPayload {
  flag: {
    slug: string;
    description: string;
    ids: string[];
    environments: string[];
  };
}

interface FlagData {
  flags: { id: string; slug: string; description: string }[];
}

interface FlagInput {
  environments: string[];
  flagSlug: string;
}

interface FlagContent {
  slug: string;
  description: string;
}

const createFlagPayload = (
  data: FlagData,
  input: FlagInput,
  path: string
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
    environment: getValue(data, "environment", {}),
  };
};

export const createProjectPayload = (data: any) => {
  return {
    project: getValue(data, "project", {}),
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
  input: any
) => {
  const action = getPathAction[path];

  if (!action) return;

  let projectId =
    path === "project.create"
      ? data.project.id
      : getValue(input, "projectId", "");

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
