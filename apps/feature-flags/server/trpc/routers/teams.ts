import {
  createTRPCRouter,
  protectedProcedure,
  withTeamRestrictions,
} from "server/trpc";
import { TRPCError } from "@trpc/server";
// Types
import { Role } from ".prisma/client";
// Utils
import { z } from "zod";
import { withUsageUpdate } from "server/db/utils/usage";
import { generateSlug } from "random-word-slugs";

export const teamsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    return ctx.prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: userId,
          },
        },
      },
      omit: {
        description: true,
      },
      include: {
        members: {
          omit: {
            teamId: true,
            createdAt: true,
            updatedAt: true,
          },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  byId: protectedProcedure
    .input(
      z
        .object({
          teamId: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.team.findUnique({
        where: {
          id: input.teamId,
        },
        omit: {
          description: true,
        },
        include: {
          members: {
            omit: {
              teamId: true,
              userId: true,
              updatedAt: true,
            },
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  image: true,
                  createdAt: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          invitations: {
            select: {
              id: true,
              email: true,
              role: true,
              expiresAt: true,
              createdAt: true,
            },
            where: {
              expiresAt: {
                // Only include invitations that haven't expired
                gt: new Date(),
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          _count: {
            select: {
              members: true,
              invitations: true,
            },
          },
        },
      });
    }),
  create: protectedProcedure
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
        const team = await tx.team.create({
          data: {
            name: input.name,
            slug: `team-${generateSlug()}`,
            description: `The default team for ${input.name}`,
            members: {
              create: {
                userId: userId,
                role: Role.ADMIN,
              },
            },
          },
        });

        await withUsageUpdate(tx, userId, "teams", "increment");

        return { team };
      });
    }),
  update: protectedProcedure
    .use(withTeamRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          teamId: z.string(),
          name: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: protectedProcedure
    .use(withTeamRestrictions({ roles: [Role.ADMIN] }))
    .input(z.object({ teamId: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

      return await ctx.prisma.$transaction(async (tx) => {
        const members = await tx.teamMembers.findMany({
          where: { teamId: input.teamId },
          select: { userId: true },
        });

        // Remove the current user from the list of users to delete because is the admin
        const userIds = members
          .filter((m) => m.userId !== userId)
          .map((m) => m.userId);

        const usersInProjects = await tx.projectsOnUsers.findMany({
          where: {
            userId: { in: userIds },
            project: {
              users: {
                some: {
                  userId: userId,
                  role: Role.ADMIN,
                },
              },
            },
          },
          select: {
            project: { select: { name: true } },
            user: { select: { name: true } },
          },
        });

        if (usersInProjects.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Some team members are still assigned to projects: ${usersInProjects
              .map((u) => `User ${u.user.name} in project ${u.project.name}`)
              .join(", ")}. Remove the users from the projects first.`,
            cause: "CannotDeleteTeamWithMembersInProjects",
          });
        }

        await tx.teamMembers.deleteMany({
          where: {
            teamId: input.teamId,
          },
        });

        const team = await tx.team.delete({
          where: {
            id: input.teamId,
          },
        });

        await withUsageUpdate(tx, userId, "teams", "decrement");
        await withUsageUpdate(
          tx,
          userId,
          "members",
          "decrement",
          // Remove the Admin from the count
          members.length - 1,
        );

        return { team };
      });
    }),
});
