// Types
import { MonitorType, Role } from ".prisma/client";
// Utils
import { type AppEnv, config, emailToId, Product } from "@basestack/utils";
import { monitorConfigSchema } from "server/api/v1/utils/monitoring";
// Vendors
import { qstash } from "@basestack/vendors";
import {
  createTRPCRouter,
  protectedProcedure,
  withProjectRestrictions,
} from "server/trpc";
import { AppMode } from "utils/helpers/general";
import { z } from "zod";

export const projectMonitorsRouter = createTRPCRouter({
  list: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      return { monitors: [] };
    }),
  create: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          name: z.string(),
          cron: z.string(),
          config: monitorConfigSchema,
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const externalCustomerId = emailToId(ctx.project.adminUserEmail);

      const monitor = await ctx.prisma.monitor.create({
        data: {
          name: input.name,
          type: MonitorType.HTTP,
          projectId: input.projectId,
          config: input.config,
        },
      });

      const { scheduleId } = await qstash.schedules.createMonitorCheckSchedule({
        cron: input.cron,
        body: {
          adminUserEmail: ctx.project.adminUserEmail,
          projectId: input.projectId,
          monitorId: monitor.id,
          externalCustomerId,
        },
        timeout: 10000,
        retries: 1,
      });

      await ctx.prisma.monitor.update({
        where: { id: monitor.id },
        data: {
          scheduleId,
        },
      });

      return { monitor };
    }),
  update: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return { monitor: null };
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return { monitor: null };
    }),
});
