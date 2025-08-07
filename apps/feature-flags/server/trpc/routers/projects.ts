// Types
import { Role } from ".prisma/client";
import { TRPCError } from "@trpc/server";
// Utils
import { generateSlug } from "random-word-slugs";
import {
  createTRPCRouter,
  protectedProcedure,
  withHistoryActivity,
  withProjectRestrictions,
} from "server/trpc";
import { z } from "zod";

export const projectsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
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
        })
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
        .required()
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
        .required()
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
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const { projectId, ...props } = input;

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

      const project = await ctx.prisma.project.update({
        where: {
          id: projectId,
        },
        data,
      });

      return { project };
    }),
  delete: protectedProcedure
    .use(withProjectRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          projectId: z.string(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.delete({
        where: { id: input.projectId },
        select: { id: true },
      });

      return { project };
    }),
});
