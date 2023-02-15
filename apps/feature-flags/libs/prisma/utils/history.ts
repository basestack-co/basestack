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

export const createFlagPayload = (data: any, input: any, path: string) => {
  const isDelete = path === "flag.delete";
  const content = getValue(data, "flags", isDelete ? {} : []);

  const ids = !isDelete
    ? (getValue(data, "flags", []) as Array<{ id: string }>).map(({ id }) => id)
    : [];

  const environments = !isDelete ? getValue(input, "environments", []) : [];

  return {
    flag: {
      slug: getValue(
        isDelete ? input : content,
        isDelete ? `flagSlug` : "[0].slug",
        ""
      )!,
      description: getValue(content, "[0].description", "")!,
      ids,
      environments,
    },
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
