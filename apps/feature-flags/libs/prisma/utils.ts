import { PrismaClient, Prisma } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";
// Auth
import { Session } from "next-auth";
// Utils
import { getValue } from "@basestack/utils";
// Types
import { HistoryAction, HistoryPayload } from "types/history";
import { RouterInput } from "libs/trpc";

/*
  QUERIES
 */
export const getUserInProject = async (
  prisma: PrismaClient,
  userId: string,
  projectId: string
) => {
  try {
    return await prisma.project.findFirst({
      where: {
        AND: [
          {
            id: projectId,
          },
          {
            users: {
              some: {
                user: {
                  id: userId,
                },
              },
            },
          },
        ],
      },
    });
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};

/*
  MUTATIONS
 */

const getPathAction: { [id: string]: string } = {
  "project.create": HistoryAction.createProject,
  "project.update": HistoryAction.updateProject,
  "environment.create": HistoryAction.createEnvironment,
  "environment.update": HistoryAction.updateEnvironment,
  "environment.delete": HistoryAction.deleteEnvironment,
  "flag.create": HistoryAction.createFlag,
  "flag.update": HistoryAction.updateFlag,
  "flag.delete": HistoryAction.deleteFlag,
};

export const createHistory = async (
  prisma: PrismaClient,
  session: Session,
  path: string,
  data: any,
  input: any
) => {
  let projectId = getValue(input, "projectId", "");
  const action = getPathAction[path] ?? "";

  console.log("action = ", action);
  console.log("data = ", data);
  console.log("input = ", input);
  console.log("------------------");

  if (action) {
    let payload: HistoryPayload = {};

    if (path.includes("environment")) {
      payload = {
        environment: {
          id: data.environment.id,
          name: data.environment.name,
          slug: data.environment.slug,
          description: data.environment.description ?? "",
        },
      };
    } else if (path.includes("project")) {
      if (path === "project.create") {
        projectId = data.project.id ?? "";
      }

      payload = {
        project: {
          name: data.project.name,
          slug: data.project.slug,
        },
      };
    } else if (path.includes("flag")) {
      if (path === "flag.create" || path === "flag.update") {
        const flagsCreateInput: RouterInput["flag"]["create"] = input;

        const flagsInput =
          path === "flag.update"
            ? getValue(data, "flags", [])
            : getValue(input, "data", []);

        payload = {
          flag: {
            slug: getValue(flagsInput, "[0].slug", "")!,
            description: getValue(flagsInput, "[0].description", "")!,

            environments: (
              flagsInput as Array<{ enabled: boolean; environmentId: boolean }>
            ).map(({ environmentId, enabled }) => ({
              id: environmentId,
              enabled,
            })),
          },
        };
      } else if (path === "flag.delete") {
        payload = {
          flag: {
            slug: getValue(input, "slug", "")!,
            description: getValue(input, "description", "")!,
            environments: [],
          },
        };
      }
    }

    if (projectId) {
      await prisma.history.create({
        data: {
          action,
          // TODO:  find the correct type for this Prisma JSON
          // @ts-ignore
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
    }
  }
};
