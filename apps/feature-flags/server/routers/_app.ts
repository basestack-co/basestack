// TRPC
import { publicProcedure, router } from "server/trpc";
// Routers
import { projectRouter } from "./project";
import { historyRouter } from "./history";
import { environmentRouter } from "./environment";
import { flagRouter } from "./flag";
import { userRouter } from "./user";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "yay!"),
  project: projectRouter,
  environment: environmentRouter,
  flag: flagRouter,
  user: userRouter,
  history: historyRouter,
});

export type AppRouter = typeof appRouter;
