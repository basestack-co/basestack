// TRPC
import { publicProcedure, router } from "server/trpc";
// Routers
import { formRouter } from "./form";
import { submissionRouter } from "./submission";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
  submission: submissionRouter,
});

export type AppRouter = typeof appRouter;
