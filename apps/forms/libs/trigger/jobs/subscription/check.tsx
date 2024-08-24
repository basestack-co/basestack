import { schedules, logger } from "@trigger.dev/sdk/v3";
// Prisma
import prisma from "libs/prisma";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getFormPlanLimitsDefaults } = config.plans;

export const checkSubsStatusTask = schedules.task({
  id: "check.subscription.status.cron",
  cron: "0 19 * * *", // Run every day at 7 PM
  machine: {
    preset: "small-2x",
  },
  init: async (payload) => {
    logger.info("Received the scheduled event", {
      payload,
    });
  },
  run: async () => {
    const subs = await prisma.subscription.findMany();

    for (const sub of subs) {
      const billingCycle = dayjs(sub.billingCycleStart);
      const today = dayjs();
      const cycleStartDate = dayjs(sub.billingCycleStart);

      // Check if today is the billing cycle start date or later
      const isOverdue =
        today.isAfter(cycleStartDate.startOf("day")) ||
        today.isSame(cycleStartDate.startOf("day"));

      logger.info(
        `User with ID: ${sub.userId} subscription billingCycle is ${billingCycle.format("YYYY-MM-DD")} and is overdue: ${isOverdue}`,
      );

      // Check if it's time to update the subscription
      if (isOverdue) {
        let payload = {};

        if (sub.cancelled || sub.paused) {
          logger.info(
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

        logger.info(
          `User ${sub.userId} subscription updated successfully`,
          response,
        );

        return response;
      }
    }
  },
  onSuccess: async () => {
    logger.info("✨ Subscription status checked successfully! ✨");
  },
});
