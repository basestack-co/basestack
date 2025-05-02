import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { TRPCError } from "@trpc/server";
// Types
import { Role } from ".prisma/client";
// Vendors
import { qstash } from "@basestack/vendors";
// Utils
import { AppMode } from "utils/helpers/general";
import { config, Product, AppEnv } from "@basestack/utils";
import { z } from "zod";
import { withUsageUpdate } from "server/db/utils/subscription";
import { generateSlug } from "random-word-slugs";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const teamRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.session?.user.id!;

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
            userId: true,
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
    .meta({
      roles: [Role.ADMIN],
    })
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
    .meta({
      usageLimitKey: "teams",
    })
    .input(
      z
        .object({
          name: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id!;

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
    .meta({
      roles: [Role.ADMIN],
    })
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
    .meta({
      roles: [Role.ADMIN],
      usageLimitKey: "teams",
    })
    .input(z.object({ teamId: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id!;

      return await ctx.prisma.$transaction(async (tx) => {
        const members = await tx.teamMembers.findMany({
          where: { teamId: input.teamId },
          select: { userId: true },
        });

        const userIds = members.map((m) => m.userId);

        const usersInProjects = await tx.projectsOnUsers.findMany({
          where: {
            userId: { in: userIds },
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
  removeMember: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
      usageLimitKey: "members",
    })
    .input(
      z
        .object({
          teamId: z.string(),
          userId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx?.session?.user.id!;

      return await ctx.prisma.$transaction(async (tx) => {
        const projects = await tx.projectsOnUsers.findMany({
          where: {
            userId: input.userId,
            role: {
              not: Role.ADMIN,
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
  updateMember: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
    })
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
  invite: protectedProcedure
    .meta({
      roles: [Role.ADMIN],
    })
    .input(
      z
        .object({
          teamId: z.string(),
          email: z.string().email(),
          role: z.enum(["DEVELOPER", "VIEWER", "TESTER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session?.user;
      const token = uuidv4();
      const expiresAt = dayjs().add(7, "day").toDate();

      const invitation = await ctx.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          const existingMember = await tx.teamMembers.findFirst({
            where: {
              OR: [
                {
                  teamId: input.teamId,
                  userId: existingUser.id,
                },
                {
                  userId: existingUser.id,
                },
              ],
            },
            include: {
              team: {
                select: {
                  name: true,
                },
              },
            },
          });

          if (existingMember) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `User is already a member of ${existingMember.team.name}`,
              cause: "AlreadyAMember",
            });
          }

          const existingInvitation = await tx.teamInvitation.findFirst({
            where: {
              email: input.email,
            },
          });

          if (existingInvitation) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `An invitation has already been sent to ${existingInvitation.email}`,
              cause: "AlreadyInvited",
            });
          }
        }

        return tx.teamInvitation.create({
          data: {
            token,
            email: input.email,
            role: input.role,
            teamId: input.teamId,
            expiresAt,
          },
          include: {
            team: {
              select: {
                name: true,
              },
            },
          },
        });
      });

      await qstash.events.sendEmailEvent({
        template: "invite",
        to: [input.email],
        subject: `You have been invited to join ${invitation.team.name} team on Basestack Feature Flags`,
        props: {
          product: "Basestack Feature Flags",
          fromUserName: user?.name ?? "",
          toUserName: input.email,
          team: invitation.team.name,
          linkText: "Accept Invitation",
          linkUrl: `${config.urls.getAppWithEnv(Product.FLAGS, AppMode as AppEnv)}/a/invite/${token}`,
        },
      });

      return { invitation };
    }),
  acceptInvitation: protectedProcedure
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

        if (existingMember) {
          await tx.teamInvitation.delete({
            where: { id: invitation.id },
          });

          throw new TRPCError({
            code: "CONFLICT",
            message: "You are already a member of this team",
            cause: "AlreadyAMember",
          });
        }

        const teamMember = await tx.teamMembers.create({
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
        });

        await tx.teamInvitation.delete({
          where: { id: invitation.id },
        });

        return { teamMember };
      });
    }),
});
