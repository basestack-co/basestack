// Types
import { Role } from ".prisma/client";
import {
  AppEnv,
  config,
  emailToId,
  generateSecureToken,
  Product,
} from "@basestack/utils";
// Vendors
import { qstash } from "@basestack/vendors";
import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
import {
  createTRPCRouter,
  protectedProcedure,
  withTeamRestrictions,
} from "server/trpc";
// Utils
import { AppMode } from "utils/helpers/general";
import { z } from "zod";

export const teamInvitesRouter = createTRPCRouter({
  byToken: protectedProcedure
    .input(
      z
        .object({
          token: z.string(),
        })
        .required(),
    )
    .query(async ({ ctx, input }) => {
      const invitation = await ctx.prisma.teamInvitation.findUnique({
        where: {
          token: input.token,
        },
        select: {
          id: true,
          email: true,
          role: true,
          expiresAt: true,
          createdAt: true,
          teamId: true,
          team: {
            select: {
              id: true,
              name: true,
              _count: {
                select: {
                  members: true,
                },
              },
            },
          },
        },
      });

      if (!invitation) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invitation not found. It might be invalid or already used.",
        });
      }

      if (invitation.expiresAt < new Date()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "This invitation has expired.",
        });
      }

      return {
        invitationId: invitation.id,
        teamId: invitation.team.id,
        teamName: invitation.team.name,
        existingMemberCount: invitation.team._count.members,
        invitedEmail: invitation.email,
        invitedRole: invitation.role,
        expiresAt: invitation.expiresAt,
        createdAt: invitation.createdAt,
      };
    }),
  create: protectedProcedure
    .use(withTeamRestrictions({ roles: [Role.ADMIN] }))
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
      const user = ctx.auth?.user;
      const externalCustomerId = emailToId(user?.email!);
      const token = generateSecureToken();
      const expiresAt = dayjs().add(7, "day").toDate();

      const invitation = await ctx.prisma.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { email: input.email },
        });

        if (existingUser) {
          const existingMember = await tx.teamMembers.findFirst({
            where: {
              userId: existingUser.id,
              team: {
                members: {
                  some: {
                    userId: user?.id!,
                    role: Role.ADMIN,
                  },
                },
              },
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
        externalCustomerId,
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
  delete: protectedProcedure
    .input(
      z
        .object({
          inviteId: z.string(),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const invitation = await ctx.prisma.teamInvitation.delete({
        where: {
          id: input.inviteId,
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
    }),
});
