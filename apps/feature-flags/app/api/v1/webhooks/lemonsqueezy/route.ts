import { NextRequest } from "next/server";
// Vendors
import { lemonsqueezy } from "@basestack/vendors";
// DB
import { prisma } from "server/db";
// Utils
import { config, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import dayjs from "dayjs";

const { getPlanByVariantId } = config.plans;

export async function POST(req: NextRequest) {
  return lemonsqueezy.webhook.createSubscriptionEvent({
    req,
    signature: process.env.LEMONSQUEEZY_SIGNATURE_SECRET ?? "",
    product: "Feature Flags",
    getPlan: (variantId, isBilledMonthly) => {
      const plan = getPlanByVariantId(Product.FLAGS, variantId, isBilledMonthly, AppMode);

      if (!plan) return null;

      return {
        id: plan.id,
        name: plan.id,
      };
    },
    onSubscriptionUpdated: async ({
      userId,
      planId,
      payload,
      paused,
      cancelled,
    }) => {
      try {
        const userExists = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true },
        });

        if (!userExists) {
          console.info(
            `LS Webhook: Basestack Feature Flags - User ${userId} does not exist. Skipping subscription update.`,
          );
          return;
        }

        const res = await prisma.subscription.upsert({
          create: {
            userId,
            planId,
            billingCycleStart: dayjs().add(1, "month").toISOString(),
            ...payload,
          },
          update: {
            planId,
            billingCycleStart: dayjs().add(1, "month").toISOString(),
            cancelled,
            paused,
            ...payload,
          },
          where: {
            userId,
          },
          select: {
            id: true,
            customerId: true,
            productId: true,
            status: true,
            planId: true,
          },
        });

        console.info(
          `LS Webhook: Basestack Feature Flags - Subscription updated on DB`,
          res,
        );
      } catch (e) {
        console.error(
          `LS Webhook: Basestack Feature Flags - Subscription failed to update on DB`,
          e,
        );
      }
    },
  });
}
