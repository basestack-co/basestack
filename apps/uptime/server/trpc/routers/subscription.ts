// Utils
import { type AppEnv, config, emailToId, Product } from "@basestack/utils";
// Vendors
import { polar } from "@basestack/vendors";
import { createTRPCRouter, protectedProcedure } from "server/trpc";
import { AppMode } from "utils/helpers/general";
import { z } from "zod";

export const subscriptionRouter = createTRPCRouter({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    const usage = await ctx.prisma.$transaction(async (tx) => {
      const [
        monitorsCount,
        statusPagesCount,
        incidentsCount,
        subscribersCount,
        teamsData,
      ] = await Promise.all([
        tx.monitor.count({
          where: {
            project: {
              users: {
                some: {
                  userId,
                },
              },
            },
          },
        }),

        tx.statusPage.count({
          where: {
            project: {
              users: {
                some: {
                  userId,
                },
              },
            },
          },
        }),

        tx.incident.count({
          where: {
            project: {
              users: {
                some: {
                  userId,
                },
              },
            },
          },
        }),

        tx.statusPageSubscriber.count({
          where: {
            statusPage: {
              project: {
                users: {
                  some: {
                    userId,
                  },
                },
              },
            },
          },
        }),

        tx.teamMembers.findMany({
          where: {
            userId,
          },
          select: {
            teamId: true,
          },
        }),
      ]);

      const uniqueTeamIds = Array.from(new Set(teamsData.map((t) => t.teamId)));

      const membersCount =
        uniqueTeamIds.length > 0
          ? await tx.teamMembers.count({
              where: {
                teamId: {
                  in: uniqueTeamIds,
                },
              },
            })
          : 0;

      return {
        monitors: monitorsCount,
        statusPages: statusPagesCount,
        incidents: incidentsCount,
        subscribers: subscribersCount,
        teams: uniqueTeamIds.length,
        members: membersCount,
      };
    });

    if (!usage) {
      return config.plans.getUptimePlanLimitsDefaults();
    }

    return usage;
  }),
  current: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.auth?.user.email!;
    const externalCustomerId = emailToId(userEmail);

    return await polar.getCustomerSubscription(
      externalCustomerId,
      Product.UPTIME,
      AppMode,
    );
  }),
  meters: protectedProcedure
    .meta({ skipSubscriptionCheck: true })
    .query(async ({ ctx }) => {
      const userEmail = ctx.auth?.user.email!;
      const externalCustomerId = emailToId(userEmail);

      const session = await polar.client.customerSessions
        .create({ externalCustomerId })
        .catch(() => null);

      if (!session?.token) {
        return { meters: [], benefits: [] };
      }

      const subscription = await polar.getCustomerSubscription(
        externalCustomerId,
        Product.UPTIME,
        AppMode,
      );

      if (!subscription?.id) {
        return { meters: [], benefits: [] };
      }

      const result = await polar.client.customerPortal.subscriptions.get(
        { customerSession: session.token },
        { id: subscription.id },
      );

      const meters =
        result?.meters?.map((meter) => ({
          id: meter.id,
          meterId: meter.meterId,
          name: meter.meter.name,
          nameKey: meter.meter?.name.toLowerCase().replace(/\s+/g, "_") ?? "",
          consumedUnits: meter.consumedUnits,
          creditedUnits: meter.creditedUnits,
          amount: meter.amount,
        })) ?? [];

      return {
        meters,
        benefits: result?.product.benefits ?? [],
      };
    }),
  portal: protectedProcedure
    .meta({ skipSubscriptionCheck: true })
    .mutation(async ({ ctx }) => {
      const userEmail = ctx.auth?.user.email!;
      const externalCustomerId = emailToId(userEmail);

      await polar.deleteCustomerSubscriptionCache(
        externalCustomerId,
        Product.UPTIME,
        AppMode,
      );

      const result = await polar.client.customerSessions.create({
        externalCustomerId,
      });

      return {
        portal: {
          url: result?.customerPortalUrl ?? "",
        },
      };
    }),
  checkout: protectedProcedure
    .meta({ skipSubscriptionCheck: true })
    .input(
      z
        .object({
          products: z.array(z.string()),
          metadata: z.record(z.string(), z.string()),
        })
        .required(),
    )
    .mutation(async ({ ctx, input }) => {
      const userEmail = ctx.auth?.user.email!;
      const userName = ctx.auth?.user.name!;

      const externalCustomerId = emailToId(userEmail);

      await polar.deleteCustomerSubscriptionCache(
        externalCustomerId,
        Product.UPTIME,
        AppMode,
      );

      const checkout = await polar.client.checkouts.create({
        products: input.products,
        metadata: input.metadata,
        externalCustomerId,
        customerEmail: userEmail,
        customerName: userName,
        successUrl: `${config.urls.getAppWithEnv(
          Product.UPTIME,
          AppMode as AppEnv,
        )}/a/user/tab/billing?checkout_id={CHECKOUT_ID}`,
      });

      return { checkout };
    }),
});
