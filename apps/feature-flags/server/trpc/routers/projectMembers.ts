import {
  protectedProcedure,
  createTRPCRouter,
  withProjectRestrictions,
} from "server/trpc";
// Utils
import { Product, AppEnv, config, emailToId } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import { z } from "zod";
// Types
import { Role } from ".prisma/client";
// Vendors
import { qstash } from "@basestack/vendors";

export const projectMembersRouter = createTRPCRouter({
  list: protectedProcedure
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

      if (connection.user.email) {
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
  update: protectedProcedure
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
  delete: protectedProcedure
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
