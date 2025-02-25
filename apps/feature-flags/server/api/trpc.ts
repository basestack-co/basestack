// Server
import { initTRPC, TRPCError } from "@trpc/server";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInProject } from "server/db/utils/user";
import { createHistory } from "server/db/utils/history";
import { getSubscriptionUsage } from "server/db/utils/subscription";
// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    prisma,
    session,
    project: {
      role: "USER", // default as fallback
    },
    ...opts,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

// ROUTERS

export const createTRPCRouter = t.router;

// MIDDLEWARES

export const middleware = t.middleware;

const logger = t.middleware(async ({ path, type, next, getRawInput, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const result = await next();

  if (type === "mutation" && result.ok) {
    const rawInput = await getRawInput();
    await createHistory(ctx.prisma, ctx.session, path, result.data!, rawInput);
  }

  return result;
});

export const isAuthenticated = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    // Check if the user is logged in
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { restricted = false } = (meta ?? {}) as { restricted: boolean };

    // This is for routes that need to verify any action if the user allowed in that project
    if (restricted) {
      const { projectId = "" } = (await getRawInput()) as {
        projectId: string;
      };

      // checks if the user is in the project
      const project = await getUserInProject(
        ctx.prisma,
        ctx?.session?.user.id!,
        projectId!,
      );

      // If the user does not exist in the project, return an error
      if (!project) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      ctx.project = {
        role: project.role,
      };
    }

    const usage = await getSubscriptionUsage(ctx.prisma, ctx.session.user.id);

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
        usage,
      },
    });
  },
);

// PROCEDURES

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(logger).use(isAuthenticated);
