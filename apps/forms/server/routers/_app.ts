// TRPC
import { publicProcedure, router } from "server/trpc";
// Routers
import { formRouter } from "./form";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
});

export type AppRouter = typeof appRouter;
