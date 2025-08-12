// Types
import { NotificationChannel, Prisma, Role } from ".prisma/client";
// Utils
// Vendors
import { TRPCError } from "@trpc/server";
// Server
import {
  createTRPCRouter,
  protectedProcedure,
  withProjectRestrictions,
} from "server/trpc";
// Utils
import { z } from "zod";

const emailSchema = z
  .string()
  .email()
  .transform((s) => s.trim().toLowerCase());

const phoneSchema = z
  .string()
  .transform((s) => s.replace(/\D/g, ""))
  .refine((s) => s.length >= 8 && s.length <= 15, "Invalid phone")
  .or(z.literal("").transform(() => null));

export const projectStatusPageSubscribersRouter = createTRPCRouter({
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

      const where: Prisma.StatusPageSubscriberWhereInput = {
        statusPage: { projectId: input.projectId },
        ...(input.search
          ? {
              OR: [
                {
                  email: {
                    contains: input.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  phone: {
                    contains: input.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {}),
      };

      const [total, subscribers] = await ctx.prisma.$transaction([
        ctx.prisma.statusPageSubscriber.count({ where }),
        ctx.prisma.statusPageSubscriber.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : 0,
          orderBy: [{ id: "desc" }],
          select: {
            id: true,
            email: true,
            phone: true,
            channels: true,
            components: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            statusPage: { select: { id: true, name: true, slug: true } },
          },
        }),
      ]);

      let nextCursor: typeof input.cursor | undefined;
      if (subscribers.length > limit) {
        const nextItem = subscribers.pop();
        nextCursor = nextItem!.id;
      }

      return { subscribers, nextCursor, total };
    }),
  create: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          statusPageId: z.string(),
          email: emailSchema.optional().nullable(),
          phone: phoneSchema.optional().nullable(),
          channels: z.array(z.nativeEnum(NotificationChannel)).min(1),
          components: z.array(z.string()).optional(),
        })
        .refine(
          (d) =>
            (!d.channels.includes("EMAIL") || !!d.email) &&
            (!d.channels.includes("SMS") || !!d.phone),
          {
            message: "EMAIL channel requires email; SMS channel requires phone",
          }
        )
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const sp = await tx.statusPage.findFirst({
          where: { id: input.statusPageId, projectId: input.projectId },
          select: { id: true },
        });

        if (!sp) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Status page not found",
          });
        }

        if (!input.email && !input.phone) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Either email or phone is required",
          });
        }

        const dup = await tx.statusPageSubscriber.findFirst({
          where: {
            statusPageId: input.statusPageId,
            OR: [
              ...(input.email ? ([{ email: input.email }] as const) : []),
              ...(input.phone ? ([{ phone: input.phone }] as const) : []),
            ],
          },
          select: { id: true },
        });

        if (dup) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Subscriber already exists for this status page",
          });
        }

        const subscriber = await tx.statusPageSubscriber.create({
          data: {
            statusPageId: input.statusPageId,
            email: input.email ?? null,
            phone: input.phone ?? null,
            channels: input.channels,
            components: input.components ?? [],
          },
          select: {
            id: true,
            email: true,
            phone: true,
            channels: true,
            components: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return { subscriber };
      });
    }),
  update: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          subscriberId: z.string(),
          statusPageId: z.string().optional(),
          email: emailSchema.optional().nullable(),
          phone: phoneSchema.optional().nullable(),
          channels: z.array(z.nativeEnum(NotificationChannel)).optional(),
          components: z.array(z.string()).optional(),
          isVerified: z.boolean().optional(),
        })
        .refine(
          (d) =>
            (!d.channels?.includes("EMAIL") ||
              (d.email !== null && d.email !== undefined)) &&
            (!d.channels?.includes("SMS") ||
              (d.phone !== null && d.phone !== undefined)),
          {
            message: "EMAIL channel requires email; SMS channel requires phone",
          }
        )
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.statusPageSubscriber.findFirst({
          where: {
            id: input.subscriberId,
            statusPage: { projectId: input.projectId },
          },
          select: { id: true, statusPageId: true, email: true, phone: true },
        });
        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Subscriber not found",
          });
        }

        const targetStatusPageId = input.statusPageId ?? existing.statusPageId;

        if (
          input.statusPageId &&
          input.statusPageId !== existing.statusPageId
        ) {
          const sp = await tx.statusPage.findFirst({
            where: { id: input.statusPageId, projectId: input.projectId },
            select: { id: true },
          });
          if (!sp) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: "Status page not found",
            });
          }
        }

        const nextEmail =
          input.email !== undefined ? (input.email ?? null) : existing.email;
        const nextPhone =
          input.phone !== undefined ? (input.phone ?? null) : existing.phone;

        if (!nextEmail && !nextPhone) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Either email or phone must be present",
          });
        }

        if (
          (nextEmail && nextEmail !== existing.email) ||
          (nextPhone && nextPhone !== existing.phone) ||
          targetStatusPageId !== existing.statusPageId
        ) {
          const dup = await tx.statusPageSubscriber.findFirst({
            where: {
              statusPageId: targetStatusPageId,
              OR: [
                ...(nextEmail ? ([{ email: nextEmail }] as const) : []),
                ...(nextPhone ? ([{ phone: nextPhone }] as const) : []),
              ],
              NOT: { id: existing.id },
            },
            select: { id: true },
          });
          if (dup) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Subscriber with same email or phone already exists",
            });
          }
        }

        const subscriber = await tx.statusPageSubscriber.update({
          where: { id: existing.id },
          data: {
            statusPageId: targetStatusPageId,
            email: nextEmail,
            phone: nextPhone,
            ...(input.channels ? { channels: input.channels } : {}),
            ...(input.components ? { components: input.components } : {}),
            ...(input.isVerified !== undefined
              ? { isVerified: input.isVerified }
              : {}),
          },
          select: {
            id: true,
            email: true,
            phone: true,
            channels: true,
            components: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
            statusPage: { select: { id: true, name: true, slug: true } },
          },
        });

        return { subscriber };
      });
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          subscriberId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.statusPageSubscriber.findFirst({
          where: {
            id: input.subscriberId,
            statusPage: { projectId: input.projectId },
          },
          select: { id: true },
        });

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Subscriber not found",
          });
        }

        const subscriber = await tx.statusPageSubscriber.delete({
          where: { id: existing.id },
          select: {
            id: true,
            email: true,
            phone: true,
            channels: true,
            components: true,
            isVerified: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return { subscriber };
      });
    }),
});
