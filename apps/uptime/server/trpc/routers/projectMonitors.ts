// Types
import { MonitorType, Role } from ".prisma/client";
// Utils
import { emailToId, Product } from "@basestack/utils";
// Vendors
import { polar, qstash } from "@basestack/vendors";
import { TRPCError } from "@trpc/server";
import { monitorConfigSchema } from "server/api/v1/utils/monitoring";
// Server
import {
  createTRPCRouter,
  protectedProcedure,
  withProjectRestrictions,
} from "server/trpc";
// Utils
import { AppMode } from "utils/helpers/general";
import { z } from "zod";

export const projectMonitorsRouter = createTRPCRouter({
  list: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z.object({
        projectId: z.string(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        search: z.string().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;

      const search = input.search
        ? {
            name: {
              search: input.search,
            },
          }
        : {};

      const where = {
        projectId: input.projectId,
        ...search,
      };

      return ctx.prisma.$transaction(async (tx) => {
        const { _count } = await tx.monitor.aggregate({
          _count: { id: true },
          where,
        });

        const monitors = await tx.monitor.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            name: true,
            type: true,
            interval: true,
            isEnabled: true,
            scheduleId: true,
            config: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                checks: true,
              },
            },
            checks: {
              orderBy: { checkedAt: "desc" },
              take: 1,
              select: {
                id: true,
                status: true,
                responseTime: true,
                responseSize: true,
                statusCode: true,
                error: true,
                region: true,
                checkedAt: true,
              },
            },
          },
        });

        let nextCursor: typeof input.cursor | undefined;
        if (monitors.length > limit) {
          const nextItem = monitors.pop();
          nextCursor = nextItem!.id;
        }

        const data = monitors.map((m) => ({
          id: m.id,
          name: m.name,
          type: m.type,
          interval: m.interval,
          isEnabled: m.isEnabled,
          scheduleId: m.scheduleId,
          config: m.config,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
          _count: m._count,
          latestCheck: m.checks[0] ?? null,
        }));

        return {
          monitors: data,
          nextCursor,
          total: _count.id,
        };
      });
    }),
  create: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          type: z.nativeEnum(MonitorType),
          projectId: z.string(),
          name: z.string(),
          cron: z.string(),
          config: monitorConfigSchema,
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const externalCustomerId = emailToId(ctx.project.adminUserEmail);

      const sub = await polar.getCustomerSubscription(
        externalCustomerId,
        Product.UPTIME,
        AppMode,
      );

      if (!sub?.id) {
        throw new TRPCError({
          code: "PAYMENT_REQUIRED",
          message:
            "No active subscription found. Please upgrade to create a monitor.",
        });
      }

      const monitor = await ctx.prisma.monitor.create({
        data: {
          name: input.name,
          type: input.type,
          projectId: input.projectId,
          config: input.config,
          isEnabled: !!sub?.id,
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
        timeout: input.config.timeout,
        retries: 1,
      });

      await ctx.prisma.monitor.update({
        where: { id: monitor.id },
        data: {
          scheduleId,
        },
      });

      return { monitor: null };
    }),
  update: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          monitorId: z.string(),
          name: z.string(),
          cron: z.string(),
          config: monitorConfigSchema,
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const monitor = await ctx.prisma.monitor.update({
        where: {
          id: input.monitorId,
        },
        data: input,
      });

      return { monitor };
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          monitorId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const monitor = await ctx.prisma.monitor.delete({
        where: {
          id: input.monitorId,
        },
      });

      return { monitor };
    }),
});
