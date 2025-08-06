import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
// Routers
import { projectEnvironmentsRouter } from "server/trpc/routers/projectEnvironments";
import { projectFlagsRouter } from "server/trpc/routers/projectFlags";
import { projectHistoryRouter } from "server/trpc/routers/projectHistory";
import { projectKeysRouter } from "server/trpc/routers/projectKeys";
import { projectMembersRouter } from "server/trpc/routers/projectMembers";
import { projectsRouter } from "server/trpc/routers/projects";
import { subscriptionRouter } from "server/trpc/routers/subscription";
import { teamInvitesRouter } from "server/trpc/routers/teamInvites";
import { teamMembersRouter } from "server/trpc/routers/teamMembers";
import { teamsRouter } from "server/trpc/routers/teams";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(
    () => "Basestack Feature Flags API is running!"
  ),
  projects: projectsRouter,
  projectFlags: projectFlagsRouter,
  projectMembers: projectMembersRouter,
  projectKeys: projectKeysRouter,
  projectEnvironments: projectEnvironmentsRouter,
  projectHistory: projectHistoryRouter,
  teams: teamsRouter,
  teamMembers: teamMembersRouter,
  teamInvites: teamInvitesRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
