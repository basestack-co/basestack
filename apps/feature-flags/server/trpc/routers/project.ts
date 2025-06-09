import {
  protectedProcedure,
  createTRPCRouter,
  withProjectRestrictions,
  withHistoryActivity,
} from "server/trpc";
// Utils
import { generateSlug } from "random-word-slugs";
import {
  Product,
  AppEnv,
  config,
  PlanTypeId,
  emailToId,
} from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import { z } from "zod";
import { withFeatures, withUsageUpdate } from "server/db/utils/usage";
// Types
import { Role } from ".prisma/client";
import { TRPCError } from "@trpc/server";
// Vendors
import { qstash } from "@basestack/vendors";

export const projectRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id;

    const all = await ctx.prisma.project.findMany({
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
      select: {
        id: true,
        name: true,
        slug: true,
        users: {
          where: {
            userId,
          },
          select: {
            role: true,
          },
          take: 1,
        },
      },
    });

    const projects = all.map((project) => ({
      ...project,
      isAdmin: project.users[0]?.role === Role.ADMIN,
      role: project.users[0]?.role ?? Role.VIEWER,
    }));

    return { projects };
  }),
  recent: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id;

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
          const flagsCount = await tx.flag.count({
            where: {
              environment: {
                isDefault: true,
                project: {
                  id: project.id,
                },
              },
            },
          });

          const userProject = await tx.projectsOnUsers.findFirst({
            where: {
              projectId: project.id,
              userId,
            },
            select: {
              role: true,
            },
          });

          const membersCount = await tx.projectsOnUsers.count({
            where: {
              projectId: project.id,
            },
          });

          return {
            ...project,
            isAdmin: userProject?.role === Role.ADMIN,
            count: {
              flags: flagsCount,
              members: membersCount,
            },
          };
        }),
      );
    });
  }),
  byId: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id;

      const data = await ctx.prisma.projectsOnUsers.findFirst({
        where: {
          projectId: input.projectId,
          userId,
        },
        select: {
          role: true,
          project: {
            select: {
              id: true,
              name: true,
              key: true,
              websites: true,
              blockIpAddresses: true,
              users: {
                where: { role: Role.ADMIN },
                select: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
          cause: "ProjectNotFound",
        });
      }

      return {
        id: data?.project.id,
        name: data?.project.name,
        key: data?.project.key,
        websites: data?.project.websites,
        blockIpAddresses: data?.project.blockIpAddresses,
        role: data?.role,
        owner: data?.project.users[0]?.user,
      };
    }),
  allKeys: protectedProcedure
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required(),
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
    .use(withProjectRestrictions({ roles: [] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required(),
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
    .use(withHistoryActivity)
    .input(
      z
        .object({
          name: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

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
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
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
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, feature, ...props } = input;

      const data = Object.fromEntries(
        Object.entries(props).filter(([_, value]) => value !== null),
      );

      if (Object.keys(data).length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No valid properties to update",
          cause: "InvalidInputProperties",
        });
      }

      const authorized = withFeatures(
        PlanTypeId.USAGE,
        feature,
      )(() =>
        ctx.prisma.project.update({
          where: {
            id: input.projectId,
          },
          data,
        }),
      );

      const project = await authorized();

      return { project };
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required(),
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
          environmentWithFlagCount?._count.flags ?? 0,
        );

        return response;
      });

      return { project };
    }),
  addMember: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN, Role.DEVELOPER] }))
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.auth?.user;
      const externalCustomerId = emailToId(ctx.project.adminUserEmail);

      const connection = await ctx.prisma.projectsOnUsers.create({
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
          role: input.role,
        },
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          project: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!!connection.user.email) {
        await qstash.events.sendEmailEvent({
          template: "addProjectMember",
          to: [connection.user.email],
          subject: `You have been added to ${connection.project.name} project on Basestack Feature Flags`,
          externalCustomerId,
          props: {
            product: "Basestack Feature Flags",
            fromUserName: user?.name ?? "",
            toUserName: connection.user.name,
            project: connection.project.name,
            linkText: "Open Project",
            linkUrl: `${config.urls.getAppWithEnv(Product.FLAGS, AppMode as AppEnv)}/a/project/${input.projectId}/flags`,
          },
        });
      }

      return { connection };
    }),
  updateMember: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
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
    .use(withProjectRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          projectId: z.string(),
          userId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const connection = await ctx.prisma.projectsOnUsers.delete({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
      });

      return { connection };
    }),
});
