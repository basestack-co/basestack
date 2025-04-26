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
import { config, FlagsPlan, PlanTypeId, Product } from "@basestack/utils";
// types
import { Role } from ".prisma/client";

// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    prisma,
    session,
    project: {
      role: "VIEWER", // default as fallback
      adminUserId: "",
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

export const isAuthenticated = middleware(async ({ next, ctx }) => {
  // Check if the user is logged in
  if (!ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
      cause: "Unauthorized",
    });
  }

  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const withPermissions = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    const { isProjectRestricted = false, roles = [] } = (meta ?? {}) as {
      isProjectRestricted: boolean;
      roles: Role[];
    };

    // This is for routes that need to verify any action if the user allowed in that project
    if (isProjectRestricted) {
      const { projectId = "" } = (await getRawInput()) as {
        projectId: string;
      };

      // checks if the user is in the project
      const project = await getUserInProject(
        ctx.prisma,
        ctx?.session?.user.id!,
        projectId!
      );

      // If the user does not exist in the project, return an error
      if (!project) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User not found in project",
          cause: "UserNotFoundInProject",
        });
      }

      // checks if the user has the required role
      if (roles.length > 0 && !roles.includes(project.role)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have the permission to perform this action",
          cause: "UserDoesNotHaveRequiredRole",
        });
      }

      ctx.project = {
        role: project.role,
        adminUserId: project.adminUserId,
      };
    }

    return next({
      ctx: {
        ...ctx,
      },
    });
  }
);

export const withUsage = middleware(async ({ next, ctx, meta }) => {
  const { usageLimitKey } = (meta ?? {}) as {
    usageLimitKey: keyof FlagsPlan["limits"];
  };

  const usage = await getSubscriptionUsage(
    ctx.prisma,
    ctx?.session?.user.id ?? ""
  );

  if (!usageLimitKey) {
    return next({
      ctx: {
        ...ctx,
        usage,
      },
    });
  }

  const planId = usage.planId as PlanTypeId;

  if (!config.plans.isValidPlan(Product.FLAGS, planId)) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message:
        "Your current plan is not supported. Please upgrade to continue.",
      cause: "InvalidPlan",
    });
  }

  const limit = config.plans.getPlanLimitByKey(Product.FLAGS, planId, usageLimitKey);

  if (usage[usageLimitKey] < limit) {
    return next({
      ctx: {
        ...ctx,
        usage,
      },
    });
  } else {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message: "Plan limit exceeded. Please consider upgrading.",
      cause: "LimitExceeded",
    });
  }
});

// PROCEDURES

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure
  .use(logger)
  .use(isAuthenticated)
  .use(withPermissions)
  .use(withUsage);
