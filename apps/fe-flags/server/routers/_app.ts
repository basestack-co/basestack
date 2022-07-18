// Utils
import superjson from "superjson";
// Routers
import { createRouter } from "../createRouter";
import { projectRouter } from "./project";
import { historyRouter } from "./history";
import { environmentRouter } from "./environment";
import { flagRouter } from "./flag";
import { userRouter } from "./user";

export const appRouter = createRouter()
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
  .merge("history.", historyRouter);

export type AppRouter = typeof appRouter;
