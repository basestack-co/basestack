// Server
import { initTRPC, TRPCError } from "@trpc/server";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInForm } from "server/db/utils/user";
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

export const withPermissions = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    const { isFormRestricted = false, roles = [] } = (meta ?? {}) as {
      isFormRestricted: boolean;
      roles: Role[];
    };

    // This is for routes that need to verify any action if the user allowed in that form
    if (isFormRestricted) {
      const { formId = "" } = (await getRawInput()) as {
        formId: string;
      };

      const form = await getUserInForm(
        ctx.prisma,
        ctx?.session?.user.id!,
        formId,
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
    }

    return next({
      ctx: {
        ...ctx,
      },
    });
  },
);

export const withUsage = middleware(async ({ next, ctx, meta }) => {
  const { usageLimitKey } = (meta ?? {}) as {
    usageLimitKey: keyof FormPlan["limits"];
  };

  const usage = await getSubscriptionUsage(
    ctx.prisma,
    ctx?.session?.user.id ?? "",
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

  if (!config.plans.isValidPlan(Product.FORMS, planId)) {
    throw new TRPCError({
      code: "PRECONDITION_FAILED",
      message:
        "Your current plan is not supported. Please upgrade to continue.",
      cause: "InvalidPlan",
    });
  }

  const limit = config.plans.getPlanLimitByKey(
    Product.FORMS,
    planId,
    usageLimitKey,
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
  .use(withPermissions)
  .use(withUsage);
