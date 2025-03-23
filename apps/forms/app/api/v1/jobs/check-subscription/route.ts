// Prisma
import { prisma } from "server/db";
// Utils
import dayjs from "dayjs";
import { config } from "@basestack/utils";
// Vendors
import { qstash } from "@basestack/vendors";

const { getFormPlanLimitsDefaults } = config.plans;

export const { POST } = qstash.jobs.CheckSubscriptionJob({
  product: "Forms",
  getSubs: async () => {
    const res = await prisma.subscription.findMany();

    return res.map(({ id, billingCycleStart, userId, cancelled, paused }) => ({
      id,
      billingCycleStart,
      userId,
      cancelled: cancelled ?? false,
      paused: paused ?? false,
    }));
  },
  onSuccess: (id, billingCycle, payload) => {
    return prisma.subscription.update({
      where: {
        id,
      },
      data: {
        billingCycleStart: dayjs(billingCycle).add(1, "month").toISOString(),
        ...getFormPlanLimitsDefaults(),
        ...payload,
      },
    });
  },
});
