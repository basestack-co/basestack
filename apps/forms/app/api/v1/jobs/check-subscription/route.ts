// Prisma
import { prisma } from "server/db";
// Utils
import dayjs from "dayjs";
// Vendors
import { qstash } from "@basestack/vendors";

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
        ...payload,
        submissions: 0,
        spams: 0,
      },
    });
  },
});
