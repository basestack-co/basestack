// Server
import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "server/trpc";
import { projectIncidentsRouter } from "server/trpc/routers/projectIncidents";
import { projectMembersRouter } from "server/trpc/routers/projectMembers";
import { projectMonitorsRouter } from "server/trpc/routers/projectMonitors";
import { projectMonitorChecksRouter } from "server/trpc/routers/projectMonitorChecks";
import { projectStatusPageSubscribersRouter } from "server/trpc/routers/projectStatusPageSubscribers";
import { projectStatusPagesRouter } from "server/trpc/routers/projectStatusPages";
// Routers
import { projectsRouter } from "server/trpc/routers/projects";
import { subscriptionRouter } from "server/trpc/routers/subscription";
import { teamInvitesRouter } from "server/trpc/routers/teamInvites";
import { teamMembersRouter } from "server/trpc/routers/teamMembers";
import { teamsRouter } from "server/trpc/routers/teams";

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "Basestack Uptime API is running!"),
  projects: projectsRouter,
  projectMonitors: projectMonitorsRouter,
  projectMonitorChecks: projectMonitorChecksRouter,
  projectIncidents: projectIncidentsRouter,
  projectStatusPages: projectStatusPagesRouter,
  projectStatusPageSubscribers: projectStatusPageSubscribersRouter,
  projectMembers: projectMembersRouter,
  teams: teamsRouter,
  teamMembers: teamMembersRouter,
  teamInvites: teamInvitesRouter,
  subscription: subscriptionRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
