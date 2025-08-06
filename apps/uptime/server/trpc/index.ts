// Server

// types
import type { Role } from ".prisma/client";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
// Auth
import { auth } from "server/auth";
// Database
import { prisma } from "server/db";
import { getUserInTeam, getUserInProject } from "server/db/utils/user";
// Utils
import superjson from "superjson";
import { ZodError } from "zod";

// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    prisma,
    auth: data,
    project: {
      role: "VIEWER", // default as fallback
      adminUserId: "",
      adminUserEmail: "",
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
  });

export const withProjectRestrictions = ({ roles }: { roles: Role[] }) =>
  middleware(async ({ next, ctx, getRawInput }) => {
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
      ctx?.auth?.user.id!,
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
      adminUserEmail: project.adminUserEmail,
    };

    return next({
      ctx: {
        ...ctx,
      },
    });
  });

// PROCEDURES

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthenticated);
