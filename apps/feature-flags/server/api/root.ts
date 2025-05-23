import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/api/trpc";
// Routers
import { environmentRouter } from "server/api/routers/environment";
import { projectRouter } from "server/api/routers/project";
import { flagRouter } from "server/api/routers/flag";
import { historyRouter } from "server/api/routers/history";
import { teamRouter } from "server/api/routers/team";
import { usageRouter } from "server/api/routers/usage";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(
    () => "Basestack Feature Flags API is running!",
  ),
  project: projectRouter,
  environment: environmentRouter,
  flag: flagRouter,
  history: historyRouter,
  team: teamRouter,
  usage: usageRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
