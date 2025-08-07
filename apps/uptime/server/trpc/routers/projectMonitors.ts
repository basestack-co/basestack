// Types
import { MonitorType, Role } from ".prisma/client";
// Utils
import { type AppEnv, config, emailToId, Product } from "@basestack/utils";
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
          url: z.string().url(),
          method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
          headers: z.record(z.string(), z.string()),
          timeout: z.number().min(1).max(300),
          expectedStatus: z.number().min(100).max(599),
          keyword: z.string(),
          port: z.number().min(1).max(6555),
          interval: z.number().min(1).max(300),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const { scheduleId } = await qstash.schedules.createMonitorCheckSchedule(
        "*/1 * * * *",
        {
          url: input.url,
          method: input.method,
        },
        100,
        1
      );

      const monitor = await ctx.prisma.monitor.create({
        data: {
          name: input.name,
          type: MonitorType.HTTP,
          projectId: input.projectId,
          scheduleId,
          config: {
            url: input.url,
            method: input.method,
            headers: input.headers,
            timeout: input.timeout,
          },
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
