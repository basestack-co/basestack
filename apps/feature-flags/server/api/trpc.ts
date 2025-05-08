// Server
import { initTRPC, TRPCError } from "@trpc/server";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInProject, getUserInTeam } from "server/db/utils/user";
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

export const withSubscriptionUsage = middleware(async ({ next, ctx, meta }) => {
  const usage = await getSubscriptionUsage(
    ctx.prisma,
    ctx?.session?.user.id ?? ""
  );

  const planId = usage.planId as PlanTypeId;

  if (!config.plans.isValidPlan(Product.FLAGS, planId)) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message:
        "Your current plan is not supported. Please upgrade to continue.",
      cause: "InvalidPlan",
    });
  }

  return next({
    ctx: {
      ...ctx,
      usage,
    },
  });
});

export const withProjectRestrictions = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    const { roles = [] } = (meta ?? {}) as {
      roles: Role[];
    };

    // This is for routes that need to verify any action if the user allowed in that project
    const { projectId = "" } = (await getRawInput()) as {
      projectId: string;
    };

    if (!projectId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Project ID is missing",
        cause: "ProjectIdMissing",
      });
    }

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

    return next({
      ctx: {
        ...ctx,
      },
    });
  }
);

export const withTeamRestrictions = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    const { roles = [] } = (meta ?? {}) as {
      roles: Role[];
    };

    const { teamId = "" } = (await getRawInput()) as {
      teamId: string;
    };

    if (!teamId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Team ID is missing",
        cause: "TeamIdMissing",
      });
    }

    const userInTeam = await getUserInTeam(
      ctx.prisma,
      ctx?.session?.user.id!,
      teamId!
    );

    if (!userInTeam) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "User not found in team",
        cause: "UserNotFoundInTeam",
      });
    }

    if (roles.length > 0 && !roles.includes(userInTeam.role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have the permission to perform this action",
        cause: "UserDoesNotHaveRequiredRole",
      });
    }

    return next({
      ctx: {
        ...ctx,
      },
    });
  }
);

export const withUsageLimits = middleware(async ({ next, ctx, meta }) => {
  const { usageLimitKey } = (meta ?? {}) as {
    usageLimitKey: keyof FlagsPlan["limits"];
  };

  const { usage } = ctx as unknown as {
    usage: Awaited<ReturnType<typeof getSubscriptionUsage>>;
  };

  const planId = usage.planId as PlanTypeId;

  const limit = config.plans.getPlanLimitByKey(
    Product.FLAGS,
    planId,
    usageLimitKey
  );

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
  .use(withSubscriptionUsage);
