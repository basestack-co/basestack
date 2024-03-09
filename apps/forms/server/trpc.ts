// Trpc
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
// Utils
import superjson from "superjson";
// Prisma
import { getUserInForm } from "libs/prisma/utils/user";

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

export const isAuthenticated = middleware(
  async ({ next, ctx, meta, rawInput }) => {
    // Check if the user is logged in
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const restricted = meta?.restricted ?? false;

    if (restricted) {
      const { formId = "" } = (rawInput ?? {}) as {
        formId: string;
      };

      const form = getUserInForm(ctx.prisma, ctx.session.user.id, formId);

      // If the user does not exist in the form, return an error
      if (!form) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
    }

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
      },
    });
  },
);

// ROUTERS

export const router = t.router;

export const mergeRouters = t.mergeRouters;

// PROCEDURES

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
