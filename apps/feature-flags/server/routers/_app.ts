// TRPC
import { publicProcedure, router } from "server/trpc";

// Utils
import superjson from "superjson";
// Routers
import { createRouter } from "../createRouter";
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

/* export const appRouter = createRouter()
  .transformer(superjson)
  .query("healthz", {
    async resolve() {
      return "yay!";
    },
  })
  .merge("project.", projectRouter)
  .merge("environment.", environmentRouter)
  .merge("flag.", flagRouter)
  .merge("user.", userRouter)
  .merge("history.", historyRouter)

export type AppRouter = typeof appRouter; */
