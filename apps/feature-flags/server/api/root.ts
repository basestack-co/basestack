import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/api/trpc";
// Routers
import { environmentRouter } from "server/api/routers/environment";
import { projectRouter } from "server/api/routers/project";
import { flagRouter } from "server/api/routers/flag";
import { userRouter } from "server/api/routers/user";
import { historyRouter } from "server/api/routers/history";
import { subscriptionRouter } from "server/api/routers/subscription";
import { teamRouter } from "server/api/routers/team";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(
    () => "Basestack Feature Flags API is running!",
  ),
  project: projectRouter,
  environment: environmentRouter,
  flag: flagRouter,
  user: userRouter,
  history: historyRouter,
  team: teamRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
