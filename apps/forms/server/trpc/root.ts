import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
// Routers
import { formRouter } from "server/trpc/routers/form";
import { submissionRouter } from "server/trpc/routers/submission";
import { subscriptionRouter } from "server/trpc/routers/subscription";
import { teamRouter } from "server/trpc/routers/team";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
  submission: submissionRouter,
  subscription: subscriptionRouter,
  team: teamRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
