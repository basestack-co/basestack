import { PrismaClient } from "@prisma/client";
// tRPC
import { TRPCError } from "@trpc/server";
// Auth
import { Session } from "next-auth";
// Utils
import { getValue } from "@basestack/utils";
// Types
import { HistoryAction } from "types/history";

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

  console.log("path = ", path);
  console.log("input = ", input);
  console.log("projectId = ", projectId);
  console.log("action = ", action);
  console.log("data = ", data);

  if (action) {
    let payload = {};

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
    } /* else if (path.includes("flag")) {
      payload = {
        flag: {},
      };
    } */

    console.log("paylaod = ", payload);
    console.log("new projectId = ", projectId);

    if (projectId) {
      const history = await prisma.history.create({
        data: {
          action,
          payload: JSON.stringify({
            user: {
              id: session.user.id,
              name: session.user.name,
              avatar: session.user.image ?? "",
            },
            ...payload,
          }),
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      console.log("history success created = ", history);
    }
  }
};
