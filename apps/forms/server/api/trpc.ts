import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { auth } from "server/auth";
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
  async ({ next, ctx, meta, rawInput, getRawInput, ...rest }) => {
    // Check if the user is logged in
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const restricted = meta?.restricted ?? false;

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

const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();

  if (t._config.isDev) {
    // artificial delay in dev
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }

  const result = await next();

  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);

  return result;
});

// PROCEDURES

export const publicProcedure = t.procedure.use(timingMiddleware);
export const protectedProcedure = t.procedure.use(isAuthenticated);
