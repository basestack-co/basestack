// Types
import { Role } from ".prisma/client";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import { withUsageUpdate } from "server/db/utils/usage";
import {
  createTRPCRouter,
  protectedProcedure,
  withTeamRestrictions,
} from "server/trpc";
// Utils
import { z } from "zod";

export const teamMembersRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const invitation = await tx.teamInvitation.findUnique({
          where: { token: input.token },
          include: {
            team: true,
          },
        });

        if (!invitation) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Invalid invitation token",
            cause: "InvalidToken",
          });
        }

        if (dayjs().isAfter(dayjs(invitation.expiresAt))) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invitation has expired",
            cause: "ExpiredToken",
          });
        }

        const userToAdd = await tx.user.findUnique({
          where: { email: invitation.email },
        });

        if (!userToAdd) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "User account required",
            cause: "UserNotFound",
          });
        }

        const existingMember = await tx.teamMembers.findUnique({
          where: {
            teamId_userId: {
              teamId: invitation.teamId,
              userId: userToAdd.id,
            },
          },
        });

        if (existingMember && existingMember.userId === userToAdd.id) {
          await tx.teamInvitation.delete({ where: { id: invitation.id } });

          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already a member of this team",
            cause: "AlreadyAMember",
          });
        }

        const [adminMember, teamMember] = await Promise.all([
          tx.teamMembers.findFirst({
            where: {
              teamId: invitation.teamId,
              role: Role.ADMIN,
            },
            select: {
              userId: true,
            },
          }),
          tx.teamMembers.create({
            data: {
              teamId: invitation.teamId,
              userId: userToAdd.id,
              role: invitation.role,
            },
            include: {
              team: {
                select: {
                  name: true,
                },
              },
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          }),
        ]);

        await withUsageUpdate(tx, adminMember?.userId!, "members", "increment");

        await tx.teamInvitation.delete({
          where: { id: invitation.id },
        });

        return { teamMember };
      });
    }),
  update: protectedProcedure
    .use(withTeamRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          teamId: z.string(),
          userId: z.string(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.teamMembers.update({
        where: {
          teamId_userId: {
            teamId: input.teamId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          team: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
  delete: protectedProcedure
    .use(withTeamRestrictions({ roles: [Role.ADMIN] }))
    .input(
      z
        .object({
          teamId: z.string(),
          userId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.auth?.user.id!;

      return await ctx.prisma.$transaction(async (tx) => {
        const projects = await tx.projectsOnUsers.findMany({
          where: {
            userId: input.userId,
            role: {
              not: Role.ADMIN,
            },
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
            project: {
              select: {
                name: true,
              },
            },
          },
        });

        if (projects.length > 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `User is a member of ${projects.map((p) => p.project.name).join(", ")}. Remove the user from the projects first.`,
            cause: "CannotRemoveMember",
          });
        }

        const member = await tx.teamMembers.delete({
          where: {
            teamId_userId: {
              teamId: input.teamId,
              userId: input.userId,
            },
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            team: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        await withUsageUpdate(tx, userId, "members", "decrement");

        return { member };
      });
    }),
});
