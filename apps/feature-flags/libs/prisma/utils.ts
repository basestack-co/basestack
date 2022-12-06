import { PrismaClient } from "@prisma/client";
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
      if (path === "project.create") {
        const flagsCreateInput: RouterInput["flag"]["create"] = input;

        payload = {
          flag: flagsCreateInput.data.map(
            ({ slug, description, environmentId, enabled }) => ({
              slug,
              description,
              environmentId,
              enabled,
            })
          ),
        };
      }
    }

    if (projectId) {
      await prisma.history.create({
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
    }
  }
};
