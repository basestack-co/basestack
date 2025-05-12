// Server
import { initTRPC, TRPCError } from "@trpc/server";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInForm, getUserInTeam } from "server/db/utils/user";
import { getSubscriptionUsage } from "server/db/utils/subscription";
import { config, FormPlan, PlanTypeId, Product } from "@basestack/utils";
// types
import { Role } from ".prisma/client";

// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    prisma,
    session,
    form: {
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

  if (!config.plans.isValidPlan(Product.FORMS, planId)) {
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

export const withFormRestrictions = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    const { roles = [] } = (meta ?? {}) as {
      roles: Role[];
    };

    // This is for routes that need to verify any action if the user allowed in that form
    const { formId = "" } = (await getRawInput()) as {
      formId: string;
    };

    if (!formId) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "Project ID is missing",
        cause: "ProjectIdMissing",
      });
    }

    // checks if the user is in the form
    const form = await getUserInForm(
      ctx.prisma,
      ctx?.session?.user.id!,
      formId
    );

    // If the user does not exist in the form, return an error
    if (!form) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "User not found in form",
        cause: "UserNotFoundInForm",
      });
    }

    // checks if the user has the required role
    if (roles.length > 0 && !roles.includes(form.role)) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You do not have the permission to perform this action",
        cause: "UserDoesNotHaveRequiredRole",
      });
    }

    ctx.form = {
      role: form.role,
      adminUserId: form.adminUserId,
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
    usageLimitKey: keyof FormPlan["limits"];
  };

  const { usage } = ctx as unknown as {
    usage: Awaited<ReturnType<typeof getSubscriptionUsage>>;
  };

  const planId = usage.planId as PlanTypeId;

  const limit = config.plans.getPlanLimitByKey(
    Product.FORMS,
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
  .use(isAuthenticated)
  .use(withSubscriptionUsage);
