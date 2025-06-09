import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
// Routers
import { environmentRouter } from "server/trpc/routers/environment";
import { projectRouter } from "server/trpc/routers/project";
import { flagRouter } from "server/trpc/routers/flag";
import { historyRouter } from "server/trpc/routers/history";
import { teamRouter } from "server/trpc/routers/team";
import { subscriptionRouter } from "server/trpc/routers/subscription";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(
    () => "Basestack Feature Flags API is running!",
  ),
  project: projectRouter,
  environment: environmentRouter,
  flag: flagRouter,
  history: historyRouter,
  team: teamRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
