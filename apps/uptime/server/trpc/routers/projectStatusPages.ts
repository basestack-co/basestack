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

const statusPageSharedSchema = z.object({
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
});

const statusPageComponentBase = z.object({
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  monitorId: z.string().optional().nullable(),
  order: z.number().int().optional(),
});

const slugSchema = z
  .string()
  .min(1)
  .refine((s) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s.trim().toLowerCase()), {
    message: "Invalid slug",
  })
  .transform((s) => s.trim().toLowerCase());

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
          slug: slugSchema,
        })
        .merge(statusPageSharedSchema)
        .extend({
          components: z.array(statusPageComponentBase).optional(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.$transaction(async (tx) => {
        const conflict = await tx.statusPage.findFirst({
          where: {
            projectId: input.projectId,
            OR: [
              { slug: input.slug },
              ...(input.domain ? [{ domain: input.domain }] : []),
            ],
          },
          select: { id: true },
        });

        if (conflict) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Slug or domain already in use",
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
            language: true,
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
          slug: slugSchema.optional(),
        })
        .merge(statusPageSharedSchema)
        .extend({
          components: z
            .array(
              statusPageComponentBase.extend({
                id: z.string().optional(),
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
          select: { id: true, slug: true, domain: true },
        });

        if (!existing) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Status page not found",
          });
        }

        if (input.slug === existing.slug || input.domain === existing.domain) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Slug or domain already in use",
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
          .filter((c): c is typeof c & { id: string } => !!c.id)
          .map((c) => {
            const data: Record<string, unknown> = {};

            if ("name" in c) data.name = c.name;
            if ("description" in c) data.description = c.description;
            if ("order" in c) data.order = c.order;
            if ("monitorId" in c) data.monitorId = c.monitorId;

            return {
              where: { id: c.id },
              data,
            };
          });

        const updatableFields: (keyof Prisma.StatusPageUpdateInput &
          keyof typeof input)[] = [
          "name",
          "slug",
          "domain",
          "isPublic",
          "isEnabled",
          "language",
          "timezone",
          "logoUrl",
          "favicon",
          "customCSS",
          "customJS",
          "theme",
          "headerMessage",
          "footerMessage",
          "twitterHandle",
          "supportUrl",
        ];

        const data: Prisma.StatusPageUpdateInput = updatableFields.reduce(
          (acc, field) => {
            if (input[field] !== undefined) {
              (acc as any)[field] = input[field] as any;
            }
            return acc;
          },
          {} as Prisma.StatusPageUpdateInput,
        );

        if (input.components || input.componentsToDelete) {
          data.components = {
            ...(toCreate.length ? { create: toCreate } : {}),
            ...(toUpdate.length ? { update: toUpdate } : {}),
            ...(input.componentsToDelete?.length
              ? { deleteMany: { id: { in: input.componentsToDelete } } }
              : {}),
          };
        }

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
            language: true,
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
