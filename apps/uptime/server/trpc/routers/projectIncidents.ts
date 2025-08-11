// Types
import { IncidentSeverity, IncidentStatus, Role } from ".prisma/client";
// Utils
import { TRPCError } from "@trpc/server";
// Server
import {
  createTRPCRouter,
  protectedProcedure,
  withProjectRestrictions,
} from "server/trpc";
// Utils
import { z } from "zod";

export const projectIncidentsRouter = createTRPCRouter({
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
            OR: [
              { title: { search: input.search } },
              { description: { search: input.search } },
            ],
          }
        : {};

      const where = {
        projectId: input.projectId,
        ...search,
      };

      // Run count and page query concurrently for lower latency
      const [total, incidents] = await ctx.prisma.$transaction([
        ctx.prisma.incident.count({ where }),
        ctx.prisma.incident.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : 0,
          // Stable order matching previous UX: newest first, then id as tiebreaker
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            severity: true,
            isScheduled: true,
            scheduledStart: true,
            scheduledEnd: true,
            resolvedAt: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                updates: true,
                monitors: true,
              },
            },
            updates: {
              orderBy: { createdAt: "desc" },
              take: 1,
              select: {
                id: true,
                message: true,
                status: true,
                createdAt: true,
              },
            },
            monitors: {
              select: {
                monitor: {
                  select: {
                    id: true,
                    name: true,
                    type: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      let nextCursor: typeof input.cursor | undefined;
      if (incidents.length > limit) {
        const nextItem = incidents.pop();
        nextCursor = nextItem!.id;
      }

      const data = incidents.map((i) => ({
        id: i.id,
        title: i.title,
        description: i.description,
        status: i.status,
        severity: i.severity,
        isScheduled: i.isScheduled,
        scheduledStart: i.scheduledStart,
        scheduledEnd: i.scheduledEnd,
        resolvedAt: i.resolvedAt,
        createdAt: i.createdAt,
        updatedAt: i.updatedAt,
        _count: i._count,
        latestUpdate: i.updates[0] ?? null,
        monitors: i.monitors.map((m) => m.monitor),
      }));

      return {
        incidents: data,
        nextCursor,
        total,
      };
    }),
  create: protectedProcedure
    .use(
      withProjectRestrictions({
        roles: [Role.ADMIN, Role.DEVELOPER, Role.OPERATOR],
      }),
    )
    .input(
      z
        .object({
          projectId: z.string(),
          title: z.string().min(1),
          description: z.string().optional().nullable(),
          status: z.nativeEnum(IncidentStatus).optional(),
          severity: z.nativeEnum(IncidentSeverity).optional(),
          isScheduled: z.boolean().optional(),
          scheduledStart: z.date().optional().nullable(),
          scheduledEnd: z.date().optional().nullable(),
          monitorIds: z.array(z.string()).optional(),
          initialUpdateMessage: z.string().optional(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        if (input.isScheduled) {
          if (!input.scheduledStart || !input.scheduledEnd) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message:
                "Scheduled incidents require both scheduledStart and scheduledEnd",
            });
          }
          if (input.scheduledStart > input.scheduledEnd) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "scheduledStart must be before scheduledEnd",
            });
          }
        }

        if (input.monitorIds?.length) {
          const count = await tx.monitor.count({
            where: { id: { in: input.monitorIds }, projectId: input.projectId },
          });
          if (count !== input.monitorIds.length) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "One or more monitors are invalid for this project",
            });
          }
        }

        const incident = await tx.incident.create({
          data: {
            projectId: input.projectId,
            title: input.title,
            description: input.description ?? null,
            status: input.status ?? IncidentStatus.INVESTIGATING,
            severity: input.severity ?? IncidentSeverity.MINOR,
            isScheduled: input.isScheduled ?? false,
            scheduledStart: input.scheduledStart ?? null,
            scheduledEnd: input.scheduledEnd ?? null,
            createdById: ctx.auth?.user.id ?? null,
            monitors: input.monitorIds?.length
              ? {
                  create: input.monitorIds.map((monitorId) => ({ monitorId })),
                }
              : undefined,
            updates: input.initialUpdateMessage
              ? {
                  create: {
                    message: input.initialUpdateMessage,
                    status: input.status ?? IncidentStatus.INVESTIGATING,
                    createdById: ctx.auth?.user.id ?? null,
                  },
                }
              : undefined,
          },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            severity: true,
            isScheduled: true,
            scheduledStart: true,
            scheduledEnd: true,
            resolvedAt: true,
            createdAt: true,
            updatedAt: true,
            updates: {
              orderBy: { createdAt: "desc" },
              take: 1,
              select: {
                id: true,
                message: true,
                status: true,
                createdAt: true,
              },
            },
            monitors: {
              select: {
                monitor: { select: { id: true, name: true, type: true } },
              },
            },
          },
        });

        return {
          incident: {
            ...incident,
            latestUpdate: incident.updates[0] ?? null,
            monitors: incident.monitors.map((m) => m.monitor),
          },
        };
      });
    }),
  update: protectedProcedure
    .use(
      withProjectRestrictions({
        roles: [Role.ADMIN, Role.DEVELOPER, Role.OPERATOR],
      }),
    )
    .input(
      z
        .object({
          projectId: z.string(),
          incidentId: z.string(),
          message: z.string().min(1),
          status: z.nativeEnum(IncidentStatus).optional(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.incident.findFirst({
          where: { id: input.incidentId, projectId: input.projectId },
          select: { id: true, status: true },
        });

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Incident not found",
          });
        }

        const effectiveStatus = input.status ?? existing.status;

        const update = await tx.incidentUpdate.create({
          data: {
            incidentId: input.incidentId,
            message: input.message,
            status: effectiveStatus,
            createdById: ctx.auth?.user.id ?? null,
          },
          select: {
            id: true,
            message: true,
            status: true,
            createdAt: true,
          },
        });

        if (input.status && input.status !== existing.status) {
          await tx.incident.update({
            where: { id: input.incidentId },
            data: {
              status: input.status,
              resolvedAt:
                input.status === IncidentStatus.RESOLVED ? new Date() : null,
            },
          });
        }

        const incident = await tx.incident.findUnique({
          where: { id: input.incidentId },
          select: {
            id: true,
            status: true,
            resolvedAt: true,
            updatedAt: true,
          },
        });

        return { update, incident };
      });
    }),
  delete: protectedProcedure
    .use(
      withProjectRestrictions({
        roles: [Role.ADMIN, Role.DEVELOPER, Role.OPERATOR],
      }),
    )
    .input(
      z
        .object({
          projectId: z.string(),
          incidentId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.incident.findFirst({
          where: { id: input.incidentId, projectId: input.projectId },
          select: { id: true },
        });

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Incident not found",
          });
        }

        const incident = await tx.incident.delete({
          where: { id: existing.id },
          select: {
            id: true,
            title: true,
            status: true,
            severity: true,
            resolvedAt: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return { incident };
      });
    }),
});
