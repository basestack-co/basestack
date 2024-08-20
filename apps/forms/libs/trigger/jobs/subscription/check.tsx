import { cronTrigger } from "@trigger.dev/sdk";
import { triggerClient } from "libs/trigger";
// Prisma
import { prisma } from "libs/prisma";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getFormPlanLimitsDefaults } = config.plans;

triggerClient.defineJob({
  id: "check.subscription.status.cron",
  name: "Check Subscription Status Cron Job",
  version: "0.1.1",
  trigger: cronTrigger({
    cron: "0 19 * * *", // Run every day at 7 PM
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info("Received the scheduled event", {
      payload,
    });

    await io.runTask(
      "check-users-subscriptions",
      async () => {
        const subs = await prisma.subscription.findMany();

        for (const sub of subs) {
          const billingCycle = dayjs(sub.billingCycleStart);
          const today = dayjs();
          const cycleStartDate = dayjs(sub.billingCycleStart);

          // Check if today is the billing cycle start date or later
          const isOverdue =
            today.isAfter(cycleStartDate.startOf("day")) ||
            today.isSame(cycleStartDate.startOf("day"));

          await io.logger.info(
            `User with ID: ${sub.userId} subscription billingCycle is ${billingCycle.format("YYYY-MM-DD")} and is overdue: ${isOverdue}`,
          );

          // Check if it's time to update the subscription
          if (isOverdue) {
            let payload = {};

            if (sub.cancelled || sub.paused) {
              await io.logger.info(
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
                billingCycleStart: dayjs(cycleStartDate)
                  .add(1, "month")
                  .toISOString(),
                ...getFormPlanLimitsDefaults(),
                ...payload,
              },
            });

            await io.logger.info(
              `User ${sub.userId} subscription updated successfully`,
              response,
            );
          }
        }
      },

      { name: "Checking users subscriptions" },
    );

    await io.logger.info("✨ Subscription status checked successfully! ✨");
  },
});
