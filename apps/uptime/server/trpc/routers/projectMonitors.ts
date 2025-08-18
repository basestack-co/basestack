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
      })
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

      const [total, monitors] = await ctx.prisma.$transaction([
        ctx.prisma.monitor.count({ where }),
        ctx.prisma.monitor.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : 0,
          orderBy: [{ id: "desc" }],
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
        }),
      ]);

      let nextCursor: typeof input.cursor | undefined;

      if (monitors.length > limit) {
        const nextItem = monitors.pop();
        nextCursor = nextItem!.id;
      }

      const data = monitors.map((m) => {
        const config = monitorConfigSchema.safeParse(m.config);

        return {
          id: m.id,
          name: m.name,
          type: m.type,
          interval: m.interval,
          isEnabled: m.isEnabled,
          scheduleId: m.scheduleId,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
          _count: m._count,
          config: config.success ? config.data : null,
          latestCheck: m.checks[0] ?? null,
        };
      });

      return {
        monitors: data,
        nextCursor,
        total,
      };
    }),
  create: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          type: z.nativeEnum(MonitorType),
          projectId: z.string(),
          name: z.string(),
          config: monitorConfigSchema,
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const externalCustomerId = emailToId(ctx.project.adminUserEmail);

      const sub = await polar.getCustomerSubscription(
        externalCustomerId,
        Product.UPTIME,
        AppMode
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

      try {
        const { scheduleId } =
          await qstash.schedules.createMonitorCheckSchedule({
            cron: input.config.cron,
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
          data: { scheduleId },
        });

        return { monitor };
      } catch {
        await ctx.prisma.monitor.delete({ where: { id: monitor.id } });

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create monitor check schedule",
        });
      }
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
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.monitor.findFirst({
        where: { id: input.monitorId, projectId: input.projectId },
        select: { id: true, scheduleId: true },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Monitor not found",
        });
      }

      const monitor = await ctx.prisma.monitor.update({
        where: { id: existing.id },
        data: {
          name: input.name,
          config: input.config,
        },
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
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.prisma.monitor.findFirst({
        where: { id: input.monitorId, projectId: input.projectId },
        select: { id: true, scheduleId: true },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Monitor not found",
        });
      }

      if (existing.scheduleId) {
        await qstash.schedules.deleteSchedule(existing.scheduleId);
      }

      const monitor = await ctx.prisma.monitor.delete({
        where: { id: existing.id },
      });

      return { monitor };
    }),
});
