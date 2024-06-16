// TRPC
import { publicProcedure, router } from "server/trpc";
// Routers
import { formRouter } from "./form";
import { submissionRouter } from "./submission";
import { subscriptionRouter } from "./subscription";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  form: formRouter,
  submission: submissionRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;
