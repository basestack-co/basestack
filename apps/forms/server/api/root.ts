import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/api/trpc";
// Routers
import { formRouter } from "server/api/routers/form";
import { submissionRouter } from "server/api/routers/submission";
import { usageRouter } from "server/api/routers/usage";
import { teamRouter } from "server/api/routers/team";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
  submission: submissionRouter,
  usage: usageRouter,
  team: teamRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
