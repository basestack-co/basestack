import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
import { PlanTypeId } from "@basestack/utils";
import { z } from "zod";
import { withFeatures, withUsageUpdate } from "server/db/utils/subscription";
// Types
import { Role } from ".prisma/client";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.session?.user.id;

    const projects = await ctx.prisma.project.findMany({
      where: {
        users: {
          some: {
            user: {
              id: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { projects };
  }),
  recent: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.session?.user.id;

    return ctx.prisma.$transaction(async (tx) => {
      const projects = await tx.project.findMany({
        where: {
          users: {
            some: {
              user: {
                id: userId,
              },
            },
          },
        },
        skip: 0,
        take: 4,
        select: {
          id: true,
          slug: true,
          name: true,
          environments: {
            select: {
              flags: {
                orderBy: {
                  updatedAt: "desc",
                },
              },
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      });

      return await Promise.all(
        projects.map(async (project) => {
          const count = await tx.flag.count({
            where: {
              environment: {
                isDefault: true,
                project: {
                  id: project.id,
                },
              },
            },
          });

          return {
            ...project,
            flags: {
              count,
            },
          };
        })
      );
    });
  }),
  byId: protectedProcedure
    .meta({
      isProjectRestricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id;

      const data = await ctx.prisma.projectsOnUsers.findFirst({
        where: {
          projectId: input.projectId,
          userId,
        },
        select: {
          role: true,
          project: true,
        },
      });

      return {
        ...data?.project,
        role: data?.role,
      };
    }),
  allKeys: protectedProcedure
    .meta({
      isProjectRestricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      const keys = await ctx.prisma.project.findUnique({
        where: {
          id: input.projectId,
        },
        select: {
          key: true,
          environments: {
            select: {
              id: true,
              name: true,
              key: true,
            },
          },
        },
      });

      return { keys };
    }),
  members: protectedProcedure
    .meta({
      isProjectRestricted: true,
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .query(async ({ ctx, input }) => {
      const users = await ctx.prisma.projectsOnUsers.findMany({
        where: {
          projectId: input.projectId,
        },
        select: {
          userId: true,
          projectId: true,
          role: true,
          user: {
            select: {
              name: true,
              email: true,
              image: true,
            },
          },
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return { users };
    }),
  create: protectedProcedure
    .meta({
      usageLimitKey: "projects",
    })
    .input(
      z
        .object({
          name: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id!;
      const planId = ctx.usage.planId as PlanTypeId;
      const hasOnlyOneEnv = planId === PlanTypeId.FREE;

      return await ctx.prisma.$transaction(async (tx) => {
        const project = await tx.project.create({
          data: {
            ...input,
            slug: `${generateSlug()}`,
            environments: {
              create: [
                {
                  name: "develop",
                  slug: `${generateSlug()}`,
                  description: "The default develop environment",
                  isDefault: true,
                },
                ...(!hasOnlyOneEnv
                  ? [
                      {
                        name: "staging",
                        slug: `${generateSlug()}`,
                        description: "The default staging environment",
                      },
                      {
                        name: "production",
                        slug: `${generateSlug()}`,
                        description: "The default production environment",
                      },
                    ]
                  : []),
              ],
            },
          },
        });

        const connection = await tx.projectsOnUsers.create({
          data: {
            project: {
              connect: {
                id: project.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        await withUsageUpdate(tx, userId, "projects", "increment");

        return { project, connection };
      });
    }),
  update: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN],
    })
    .input(
      z
        .object({
          projectId: z.string(),
          name: z.string().nullable().default(null),
          blockIpAddresses: z.string().nullable().default(null),
          websites: z.string().nullable().default(null),
          feature: z
            .enum([
              "hasHistory",
              "hasBlockIPs",
              "hasRollouts",
              "hasSegments",
              "hasWebsites",
              "hasTags",
              "hasRemoteConfig",
              "hasPreviewFeatures",
            ])
            .nullable()
            .default(null),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const planId = ctx.usage.planId as PlanTypeId;
      const { projectId, feature, ...props } = input;

      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null)
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No valid properties to update",
          cause: "InvalidInputProperties",
        });
      }

      const authorized = withFeatures(
        planId,
        feature
      )(() =>
        ctx.prisma.project.update({
          where: {
            id: input.projectId,
          },
          data,
        })
      );

      const project = await authorized();

      return { project };
    }),
  delete: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN],
    })
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const projectAdminUserId = ctx.project.adminUserId;

      const project = await ctx.prisma.$transaction(async (tx) => {
        const environmentWithFlagCount = await tx.environment.findFirst({
          where: {
            projectId: input.projectId,
            isDefault: true,
          },
          select: {
            id: true,
            _count: {
              select: {
                flags: true,
              },
            },
          },
        });

        const response = await tx.project.delete({
          where: { id: input.projectId },
          select: { id: true },
        });

        await withUsageUpdate(tx, projectAdminUserId, "projects", "decrement");
        await withUsageUpdate(
          tx,
          projectAdminUserId,
          "flags",
          "decrement",
          environmentWithFlagCount?._count.flags ?? 0
        );

        return response;
      });

      return { project };
    }),
  addMember: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN, Role.DEVELOPER],
      usageLimitKey: "members",
    })
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const projectAdminUserId = ctx.project.adminUserId;

      const connection = await ctx.prisma.$transaction(async (tx) => {
        const response = await tx.projectsOnUsers.create({
          data: {
            project: {
              connect: {
                id: input.projectId,
              },
            },
            user: {
              connect: {
                id: input.userId,
              },
            },
            role: "USER",
          },
        });

        await withUsageUpdate(tx, projectAdminUserId, "members", "increment");

        return response;
      });

      return { connection };
    }),
  updateMember: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN],
    })
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
          role: z.enum(["USER", "ADMIN"]),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.projectsOnUsers.update({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
        select: {
          userId: true,
          role: true,
        },
      });

      return { connection };
    }),
  removeMember: protectedProcedure
    .meta({
      isProjectRestricted: true,
      roles: [Role.ADMIN],
    })
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id!;

      const connection = await ctx.prisma.$transaction(async (tx) => {
        const response = await tx.projectsOnUsers.delete({
          where: {
            projectId_userId: {
              projectId: input.projectId,
              userId: input.userId,
            },
          },
        });

        await withUsageUpdate(tx, userId, "members", "decrement");

        return response;
      });

      return { connection };
    }),
});
