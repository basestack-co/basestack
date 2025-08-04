import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
// Routers
import { subscriptionRouter } from "server/trpc/routers/subscription";
import { teamInvitesRouter } from "server/trpc/routers/teamInvites";
import { teamMembersRouter } from "server/trpc/routers/teamMembers";
import { teamsRouter } from "server/trpc/routers/teams";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Uptime API is running!"),
  teams: teamsRouter,
  teamMembers: teamMembersRouter,
  teamInvites: teamInvitesRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
