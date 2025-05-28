import { protectedProcedure, createTRPCRouter } from "server/api/trpc";
// Utils
import { AppEnv, config, Product, emailToId } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import { z } from "zod";
// Vendors
import { polar, redis } from "@basestack/vendors";

export const subscriptionRouter = createTRPCRouter({
  usage: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx?.auth?.user.id!;

    const usage = await ctx.prisma.usage.findFirst({
      where: {
        userId,
      },
      omit: {
        userId: true,
        updatedAt: true,
        createdAt: true,
      },
    });

    if (!usage) {
      return config.plans.getFlagsPlanLimitsDefaults();
    }

    return usage;
  }),
  current: protectedProcedure.query(async ({ ctx }) => {
    const userEmail = ctx.auth?.user.email!;
    const customerExternalId = emailToId(userEmail);

    const subscription = await polar.getCustomerSubscription(
      customerExternalId,
      Product.FLAGS,
    );

    return subscription;
  }),
  meters: protectedProcedure
    .meta({ skipSubscriptionCheck: true })
    .query(async ({ ctx }) => {
      const userEmail = ctx.auth?.user.email!;
      const customerExternalId = emailToId(userEmail);

      const session = await polar.client.customerSessions.create({
        customerExternalId,
      });

      const subscription = await polar.getCustomerSubscription(
        customerExternalId,
        Product.FLAGS,
      );

      const result = await polar.client.customerPortal.subscriptions.get(
        {
          customerSession: session.token ?? "",
        },
        {
          id: subscription?.id ?? "",
        },
      );

      const meters =
        result?.meters?.map((meter) => ({
          id: meter.id,
          meterId: meter.meterId,
          name: meter.meter.name,
          nameKey: meter?.meter?.name.toLowerCase().replace(" ", "_") ?? "",
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
      const customerExternalId = emailToId(userEmail);

      await redis.client.del(`subscription:${customerExternalId}`);

      const result = await polar.client.customerSessions.create({
        customerExternalId,
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
      const userId = ctx?.auth?.user.id!;
      const userEmail = ctx.auth?.user.email!;
      const userName = ctx.auth?.user.name!;

      const customerExternalId = emailToId(userEmail);

      await redis.client.del(`subscription:${userId}`);

      const checkout = await polar.client.checkouts.create({
        products: input.products,
        metadata: input.metadata,
        customerExternalId,
        customerEmail: userEmail,
        customerName: userName,
        successUrl: `${config.urls.getAppWithEnv(
          Product.FLAGS,
          AppMode as AppEnv,
        )}/a/user/tab/billing?checkout_id={CHECKOUT_ID}`,
      });

      return { checkout };
    }),
});
