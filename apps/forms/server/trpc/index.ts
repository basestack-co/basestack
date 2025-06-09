// Server
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";
import { AppMode } from "utils/helpers/general";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInForm, getUserInTeam } from "server/db/utils/user";
import { Product, emailToId } from "@basestack/utils";
// Vendors
import { polar } from "@basestack/vendors";
// types
import { Role } from ".prisma/client";

// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    prisma,
    auth: data,
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
  if (!ctx.auth?.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
      cause: "Unauthorized",
    });
  }

  return next({
    ctx: {
      ...ctx,
      auth: ctx.auth,
    },
  });
});

export const withSubscription = middleware(
  async ({ next, ctx, type, meta }) => {
    const { skipSubscriptionCheck = false } = (meta ?? {}) as {
      skipSubscriptionCheck?: boolean;
    };

    if (type === "mutation" && !skipSubscriptionCheck) {
      const userEmail = ctx.auth?.user.email!;
      const customerExternalId = emailToId(userEmail);

      const sub = await polar.getCustomerSubscription(
        customerExternalId,
        Product.FORMS,
        AppMode,
      );

      if (sub?.status !== "active") {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message:
            "No active subscription found. Please add your billing details to continue using the product.",
          cause: "InvalidPlan",
        });
      }

      return next({ ctx });
    }

    return next({ ctx });
  },
);

export const withFormRestrictions = ({ roles }: { roles: Role[] }) =>
  middleware(async ({ next, ctx, getRawInput }) => {
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
    const form = await getUserInForm(ctx.prisma, ctx?.auth?.user.id!, formId);

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
  });

export const withTeamRestrictions = ({ roles }: { roles: Role[] }) =>
  middleware(async ({ next, ctx, getRawInput }) => {
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
      ctx?.auth?.user.id!,
      teamId!,
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
  });

// PROCEDURES

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthenticated);
