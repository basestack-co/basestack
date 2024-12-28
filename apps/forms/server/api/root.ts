import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/api/trpc";
// Routers
import { formRouter } from "server/api/routers/form";
import { submissionRouter } from "server/api/routers/submission";
import { subscriptionRouter } from "server/api/routers/subscription";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
  submission: submissionRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
