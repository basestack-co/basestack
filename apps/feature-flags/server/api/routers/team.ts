import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
// Types
import { Role } from ".prisma/client";
// Utils
import { z } from "zod";
import { PlanTypeId, withRoles } from "@basestack/utils";
import { withLimits, withUsageUpdate } from "server/db/utils/subscription";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const teamRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    return await ctx.prisma.team.findMany({
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
            projects: true,
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
      return await ctx.prisma.team.findUnique({
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
          projects: {
            select: {
              id: true,
              name: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: {
            select: {
              members: true,
              projects: true,
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
      const userId = ctx.session.user.id;
      const planId = ctx.usage.planId as PlanTypeId;

      const authorized = withLimits(
        planId,
        "teams",
        ctx.usage.teams,
      )(() =>
        ctx.prisma.$transaction(async (tx) => {
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
        }),
      );

      return authorized();
    }),
  update: protectedProcedure
    .input(
      z
        .object({
          teamId: z.string(),
          name: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.team.update({
        where: {
          id: input.teamId,
        },
        data: {
          name: input.name,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ teamId: z.string() }).required())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const planId = ctx.usage.planId as PlanTypeId;

      const authorized = withLimits(
        planId,
        "teams",
        ctx.usage.teams,
      )(() =>
        ctx.prisma.$transaction(async (tx) => {
          await tx.teamMembers.deleteMany({
            where: {
              teamId: input.teamId,
            },
          });

          /*  const projects = await tx.project.findMany({
            where: {
              teamId: input.teamId,
            },
            select: {
              id: true,
            },
          });

          const projectIds = projects.map((project) => project.id);

          if (projectIds.length > 0) {
            await tx.environment.deleteMany({
              where: {
                projectId: {
                  in: projectIds,
                },
              },
            });

            await tx.project.deleteMany({
              where: {
                id: {
                  in: projectIds,
                },
              },
            });
          } */

          const team = await tx.team.delete({
            where: {
              id: input.teamId,
            },
          });

          await withUsageUpdate(tx, userId, "teams", "decrement");

          return { team };
        }),
      );

      return authorized();
    }),
  removeMember: protectedProcedure
    .input(
      z
        .object({
          teamId: z.string(),
          userId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const planId = ctx.usage.planId as PlanTypeId;

      // TODO: Need to get the role by the user and not from the project
      const authorized = withRoles(ctx.project.role, [Role.ADMIN])(
        withLimits(
          planId,
          "members",
          ctx.usage.teams,
        )(() =>
          ctx.prisma.$transaction(async (tx) => {
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
          }),
        ),
      );

      return authorized();
    }),
  updateMember: protectedProcedure
    .input(
      z
        .object({
          teamId: z.string(),
          userId: z.string(),
          role: z.enum(["ADMIN", "USER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.teamMembers.update({
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
    .input(
      z
        .object({
          teamId: z.string(),
          email: z.string().email(),
          role: z.enum(["ADMIN", "USER"]),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          const existingMember = await tx.teamMembers.findUnique({
            where: {
              teamId_userId: {
                teamId: input.teamId,
                userId: existingUser.id,
              },
            },
          });

          if (existingMember) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "User is already a member of this team",
            });
          }

          const existingInvitation = await tx.teamInvitation.findFirst({
            where: {
              teamId: input.teamId,
              email: input.email,
            },
          });

          if (existingInvitation) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "An invitation has already been sent to this email",
            });
          }
        }

        const token = uuidv4();
        const expiresAt = dayjs().add(7, "day").toDate();

        const invitation = await tx.teamInvitation.create({
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

        return { invitation };
      });
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
            code: "BAD_REQUEST",
            message: "Invalid invitation token",
          });
        }

        if (dayjs().isAfter(dayjs(invitation.expiresAt))) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invitation has expired",
          });
        }

        const userToAdd = await tx.user.findUnique({
          where: { email: invitation.email },
        });

        if (!userToAdd) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "User account required",
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
            code: "BAD_REQUEST",
            message: "You are already a member of this team",
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
