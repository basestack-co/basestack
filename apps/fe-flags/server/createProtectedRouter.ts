import { PrismaClient } from "@prisma/client";
// Trpc
import * as trpc from "@trpc/server";
import { Context } from "./context";
// Utils
import { getValue, isEmpty } from "@basestack/utils";

export interface Meta {
  restricted?: boolean;
}

// Checks if user can do an action in this project like create, update, delete
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
    throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
  }
};

export function createProtectedRouter() {
  return trpc
    .router<Context, Meta>()
    .middleware(async ({ ctx, next, meta, rawInput }) => {
      if (!ctx.session) {
        throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
      }

      const restricted = getValue(meta, "restricted", false);

      // This is for routes that need to verify any action if the user allowed in that project
      if (restricted) {
        const projectId = getValue(rawInput, "projectId", "");

        // checks if the user is in the project
        const isUserAllowedInProject = await getUserInProject(
          ctx.prisma,
          ctx.session.user.id,
          projectId
        );

        // If the user does not exist in the project, return an error
        if (isEmpty(isUserAllowedInProject)) {
          throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
        }
      }

      return next({
        ctx: {
          ...ctx,
          session: ctx.session,
        },
      });
    });
}
