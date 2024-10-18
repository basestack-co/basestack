// UpStash
import { serve } from "@upstash/qstash/nextjs";
import { Receiver } from "@upstash/qstash";
// Prisma
import prisma from "libs/prisma";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getFormPlanLimitsDefaults } = config.plans;

//  cron: "0 19 * * *", // Run every day at 7 PM

export const POST = serve(
  async (context) => {
    console.info("Received the scheduled event");

    await context.run("check-users-subscriptions-step", async () => {
      const subs = await prisma.subscription.findMany();

      for (const sub of subs) {
        const billingCycle = dayjs(sub.billingCycleStart);
        const today = dayjs();

        // Check if today is the billing cycle start date or later
        const isOverdue =
          today.isAfter(billingCycle.startOf("day")) ||
          today.isSame(billingCycle.startOf("day"));

        console.info(
          `User with ID: ${sub.userId} subscription billingCycle is ${billingCycle.format("YYYY-MM-DD")} and is overdue: ${isOverdue}`,
        );

        // Check if it's time to update the subscription
        if (isOverdue) {
          let payload = {};

          if (sub.cancelled || sub.paused) {
            console.info(
              `User with ID ${sub.userId} has an cancelled or paused subscription`,
            );

            payload = {
              planId: PlanTypeId.FREE,
              event: SubscriptionEvent.SUBSCRIPTION_CANCELLED,
            };
          }

          const response = await prisma.subscription.update({
            where: {
              id: sub.id,
            },
            data: {
              billingCycleStart: dayjs(billingCycle)
                .add(1, "month")
                .toISOString(),
              ...getFormPlanLimitsDefaults(),
              ...payload,
            },
          });

          console.info(
            `User ${sub.userId} subscription updated successfully`,
            response,
          );
        }
      }
    });
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
  },
);
