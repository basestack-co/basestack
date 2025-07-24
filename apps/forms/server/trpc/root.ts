import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
import { formMembersRouter } from "server/trpc/routers/formMembers";
import { formSubmissionsRouter } from "server/trpc/routers/formSubmissions";
// Routers
import { formsRouter } from "server/trpc/routers/forms";
import { subscriptionRouter } from "server/trpc/routers/subscription";
import { teamInvitesRouter } from "server/trpc/routers/teamInvites";
import { teamMembersRouter } from "server/trpc/routers/teamMembers";
import { teamsRouter } from "server/trpc/routers/teams";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Forms API is running!"),
  forms: formsRouter,
  formMembers: formMembersRouter,
  formSubmissions: formSubmissionsRouter,
  teams: teamsRouter,
  teamMembers: teamMembersRouter,
  teamInvites: teamInvitesRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
