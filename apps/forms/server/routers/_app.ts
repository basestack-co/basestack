// TRPC
import { publicProcedure, router } from "server/trpc";
// Routers
import { projectRouter } from "./project";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
