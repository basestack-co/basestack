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

// CONTEXT

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await auth();

  return {
    prisma,
    session,
    form: {
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

export const isAuthenticated = middleware(
  async ({ next, ctx, meta, getRawInput }) => {
    // Check if the user is logged in
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { restricted = false } = (meta ?? {}) as { restricted: boolean };

    if (restricted) {
      const { formId = "" } = (await getRawInput()) as {
        formId: string;
      };

      const form = await getUserInForm(ctx.prisma, ctx.session.user.id, formId);

      // If the user does not exist in the form, return an error
      if (!form) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      ctx.form = {
        role: form.role,
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
export const protectedProcedure = t.procedure.use(isAuthenticated);
