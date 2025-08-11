// Types
import { Prisma, Role } from ".prisma/client";
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

export const projectStatusPagesRouter = createTRPCRouter({
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

      const where: Prisma.StatusPageWhereInput = {
        projectId: input.projectId,
        ...(input.search
          ? {
              OR: [
                {
                  name: {
                    contains: input.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  slug: {
                    contains: input.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  domain: {
                    contains: input.search,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            }
          : {}),
      };

      const [total, statusPages] = await ctx.prisma.$transaction([
        ctx.prisma.statusPage.count({ where }),
        ctx.prisma.statusPage.findMany({
          where,
          take: limit + 1,
          cursor: input.cursor ? { id: input.cursor } : undefined,
          skip: input.cursor ? 1 : 0,
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            isPublic: true,
            isEnabled: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: {
                components: true,
                subscribers: true,
                incidents: true,
              },
            },
          },
        }),
      ]);

      let nextCursor: typeof input.cursor | undefined;
      if (statusPages.length > limit) {
        const nextItem = statusPages.pop();
        nextCursor = nextItem!.id;
      }

      return { statusPages, nextCursor, total };
    }),
  create: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          name: z.string().min(1),
          slug: z.string().min(1),
          domain: z.string().optional().nullable(),
          isPublic: z.boolean().optional(),
          isEnabled: z.boolean().optional(),
          language: z.string().optional(), // defaults to "en"
          timezone: z.string().optional(), // defaults to "UTC"
          logoUrl: z.string().url().optional().nullable(),
          favicon: z.string().url().optional().nullable(),
          customCSS: z.string().optional().nullable(),
          customJS: z.string().optional().nullable(),
          theme: z.any().optional(),
          headerMessage: z.string().optional().nullable(),
          footerMessage: z.string().optional().nullable(),
          twitterHandle: z.string().optional().nullable(),
          supportUrl: z.string().url().optional().nullable(),
          components: z
            .array(
              z.object({
                name: z.string().min(1),
                description: z.string().optional().nullable(),
                monitorId: z.string().optional().nullable(),
                order: z.number().int().optional(),
              }),
            )
            .optional(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const monitorIds = Array.from(
          new Set(
            (input.components ?? [])
              .map((c) => c.monitorId)
              .filter((v): v is string => !!v),
          ),
        );

        if (monitorIds.length) {
          const count = await tx.monitor.count({
            where: { id: { in: monitorIds }, projectId: input.projectId },
          });
          if (count !== monitorIds.length) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "One or more monitors are invalid for this project",
            });
          }
        }

        const statusPage = await tx.statusPage.create({
          data: {
            projectId: input.projectId,
            name: input.name,
            slug: input.slug,
            domain: input.domain ?? null,
            isPublic: input.isPublic ?? true,
            isEnabled: input.isEnabled ?? true,
            language: input.language,
            timezone: input.timezone,
            logoUrl: input.logoUrl ?? null,
            favicon: input.favicon ?? null,
            customCSS: input.customCSS ?? null,
            customJS: input.customJS ?? null,
            theme: input.theme,
            headerMessage: input.headerMessage ?? null,
            footerMessage: input.footerMessage ?? null,
            twitterHandle: input.twitterHandle ?? null,
            supportUrl: input.supportUrl ?? null,
            components: input?.components?.length
              ? {
                  create: input.components.map((c, idx) => ({
                    name: c.name,
                    description: c.description ?? null,
                    order: c.order ?? idx,
                    monitorId: c.monitorId ?? null,
                  })),
                }
              : undefined,
          },
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            isPublic: true,
            isEnabled: true,
            timezone: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { components: true, subscribers: true, incidents: true },
            },
            components: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                name: true,
                description: true,
                status: true,
                order: true,
                monitor: { select: { id: true, name: true, type: true } },
              },
            },
          },
        });

        return { statusPage };
      });
    }),
  update: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          statusPageId: z.string(),
          name: z.string().optional(),
          slug: z.string().optional(),
          domain: z.string().optional().nullable(),
          isPublic: z.boolean().optional(),
          isEnabled: z.boolean().optional(),
          language: z.string().optional(),
          timezone: z.string().optional(),
          logoUrl: z.string().url().optional().nullable(),
          favicon: z.string().url().optional().nullable(),
          customCSS: z.string().optional().nullable(),
          customJS: z.string().optional().nullable(),
          theme: z.any().optional(),
          headerMessage: z.string().optional().nullable(),
          footerMessage: z.string().optional().nullable(),
          twitterHandle: z.string().optional().nullable(),
          supportUrl: z.string().url().optional().nullable(),
          components: z
            .array(
              z.object({
                id: z.string().optional(),
                name: z.string().min(1),
                description: z.string().optional().nullable(),
                monitorId: z.string().optional().nullable(),
                order: z.number().int().optional(),
              }),
            )
            .optional(),
          componentsToDelete: z.array(z.string()).optional(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.statusPage.findFirst({
          where: { id: input.statusPageId, projectId: input.projectId },
          select: { id: true },
        });
        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Status page not found",
          });
        }

        const monitorIds = Array.from(
          new Set(
            (input.components ?? [])
              .map((c) => c.monitorId)
              .filter((v): v is string => !!v),
          ),
        );
        if (monitorIds.length) {
          const count = await tx.monitor.count({
            where: { id: { in: monitorIds }, projectId: input.projectId },
          });
          if (count !== monitorIds.length) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "One or more monitors are invalid for this project",
            });
          }
        }

        const toCreate = (input.components ?? [])
          .filter((c) => !c.id)
          .map((c, idx) => ({
            name: c.name,
            description: c.description ?? null,
            order: c.order ?? idx,
            monitorId: c.monitorId ?? null,
          }));

        const toUpdate = (input.components ?? [])
          .filter((c) => !!c.id)
          .map((c) => ({
            where: { id: c.id! },
            data: {
              name: c.name,
              description: c.description ?? null,
              order: c.order ?? 0,
              monitorId: c.monitorId ?? null,
            },
          }));

        const data: Prisma.StatusPageUpdateInput = {
          ...(input.name !== undefined ? { name: input.name } : {}),
          ...(input.slug !== undefined ? { slug: input.slug } : {}),
          ...(input.domain !== undefined ? { domain: input.domain } : {}),
          ...(input.isPublic !== undefined ? { isPublic: input.isPublic } : {}),
          ...(input.isEnabled !== undefined
            ? { isEnabled: input.isEnabled }
            : {}),
          ...(input.language !== undefined ? { language: input.language } : {}),
          ...(input.timezone !== undefined ? { timezone: input.timezone } : {}),
          ...(input.logoUrl !== undefined ? { logoUrl: input.logoUrl } : {}),
          ...(input.favicon !== undefined ? { favicon: input.favicon } : {}),
          ...(input.customCSS !== undefined
            ? { customCSS: input.customCSS }
            : {}),
          ...(input.customJS !== undefined ? { customJS: input.customJS } : {}),
          ...(input.theme !== undefined ? { theme: input.theme } : {}),
          ...(input.headerMessage !== undefined
            ? { headerMessage: input.headerMessage }
            : {}),
          ...(input.footerMessage !== undefined
            ? { footerMessage: input.footerMessage }
            : {}),
          ...(input.twitterHandle !== undefined
            ? { twitterHandle: input.twitterHandle }
            : {}),
          ...(input.supportUrl !== undefined
            ? { supportUrl: input.supportUrl }
            : {}),
          ...(input.components || input.componentsToDelete
            ? {
                components: {
                  ...(toCreate.length ? { create: toCreate } : {}),
                  ...(toUpdate.length ? { update: toUpdate } : {}),
                  ...(input.componentsToDelete?.length
                    ? { deleteMany: { id: { in: input.componentsToDelete } } }
                    : {}),
                },
              }
            : {}),
        };

        const statusPage = await tx.statusPage.update({
          where: { id: existing.id },
          data,
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            isPublic: true,
            isEnabled: true,
            timezone: true,
            createdAt: true,
            updatedAt: true,
            _count: {
              select: { components: true, subscribers: true, incidents: true },
            },
            components: {
              orderBy: { order: "asc" },
              select: {
                id: true,
                name: true,
                description: true,
                status: true,
                order: true,
                monitor: { select: { id: true, name: true, type: true } },
              },
            },
          },
        });

        return { statusPage };
      });
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          statusPageId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const existing = await tx.statusPage.findFirst({
          where: { id: input.statusPageId, projectId: input.projectId },
          select: { id: true },
        });

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Status page not found",
          });
        }

        const statusPage = await tx.statusPage.delete({
          where: { id: existing.id },
          select: {
            id: true,
            name: true,
            slug: true,
            domain: true,
            isPublic: true,
            isEnabled: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return { statusPage };
      });
    }),
});
