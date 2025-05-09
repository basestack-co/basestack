// UpStash
import { NextRequest } from "next/server";
// Vendors
import { lemonsqueezy } from "@basestack/vendors";
// Utils
import { config, Product } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";
import dayjs from "dayjs";
// DB
import { prisma } from "server/db";

const { getPlanByVariantId } = config.plans;

export async function POST(req: NextRequest) {
  return lemonsqueezy.webhook.createSubscriptionEvent({
    req,
    signature: process.env.LEMONSQUEEZY_SIGNATURE_SECRET ?? "",
    product: "Forms",
    getPlan: (variantId, isBilledMonthly) => {
      const plan = getPlanByVariantId(
        Product.FORMS,
        variantId,
        isBilledMonthly,
        AppMode,
      );

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
            `LS Webhook: Basestack Forms - User ${userId} does not exist. Skipping subscription update.`,
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
          `LS Webhook: Basestack Forms - Subscription updated on DB`,
          res,
        );
      } catch (e) {
        console.info(
          `LS Webhook: Basestack Forms - Subscription failed to update on DB`,
          e,
        );
      }
    },
  });
}
