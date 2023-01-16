// Trpc
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
// Utils
import superjson from "superjson";
import { getValue, isEmpty } from "@basestack/utils";
// Prisma
import { createHistory, getUserInProject } from "libs/prisma/utils";

export type Meta = {
  restricted?: boolean;
};

// CONTEXT

const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    transformer: superjson,
    errorFormatter({ shape }) {
      return shape;
    },
  });

// MIDDLEWARES

export const middleware = t.middleware;

const logger = t.middleware(async ({ path, type, next, rawInput, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const result = await next();

  if (type === "mutation" && result.ok && result.data) {
   await createHistory(ctx.prisma, ctx.session, path, result.data, rawInput);
  }

  return result;
});

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

const loggedProcedure = t.procedure.use(logger);

export const protectedProcedure = t.procedure.use(logger).use(isAuthenticated);
