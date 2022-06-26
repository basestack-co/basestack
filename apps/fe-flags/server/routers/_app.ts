import { createRouter } from "../createRouter";
import { projectRouter } from "./project";
import superjson from "superjson";

export const appRouter = createRouter()
  .transformer(superjson)
  .query("healthz", {
    async resolve() {
      return "yay!";
    },
  })
  .merge("project.", projectRouter);

export type AppRouter = typeof appRouter;
