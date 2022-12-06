// Prima
import { PrismaClient } from "@prisma/client";
// Trpc
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
// Utils
import superjson from "superjson";
import { getValue, isEmpty } from "@basestack/utils";
import { createProtectedRouter } from "./createProtectedRouter";

export type Meta = {
  restricted?: boolean;
};

// CONTEXT

const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    /**
     * @see https://trpc.io/docs/v10/data-transformers
     */
    transformer: superjson,
    /**
     * @see https://trpc.io/docs/v10/error-formatting
     */
    errorFormatter({ shape }) {
      return shape;
    },
  });

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
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};

// MIDDLEWARES

export const middleware = t.middleware;

export const isAuthenticated = middleware(
  async ({ next, ctx, meta, rawInput }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const restricted = getValue(meta, "restricted", false);
    const projectId = getValue(rawInput, "projectId", "");

    // This is for routes that need to verify any action if the user allowed in that project
    if (restricted && projectId) {
      // checks if the user is in the project
      const isUserAllowedInProject = await getUserInProject(
        ctx.prisma,
        ctx.session.user.id,
        projectId
      );

      // If the user does not exist in the project, return an error
      if (isEmpty(isUserAllowedInProject)) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
    }

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  }
);

// ROUTERS

export const router = t.router;

export const mergeRouters = t.mergeRouters;

// PROCEDURES

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthenticated);
