// Prisma
import { prisma } from "server/db";
// Utils
import dayjs from "dayjs";
// Vendors
import { qstash } from "@basestack/vendors";

export const { POST } = qstash.jobs.UpdateSubscriptionJob({
  product: "Feature Flags",
  onSuccess: (userId, planId, isUpdate, body) => {
    const payload = {
      subscriptionId: body.data.id,
      customerId: body.data.attributes.customer_id,
      status: body.data.attributes.status,
      productId: body.data.attributes.product_id,
      event: body.meta.event_name,
      variantId: body.data.attributes.variant_id,
    };

    return prisma.subscription.upsert({
      create: {
        userId,
        planId,
        billingCycleStart: dayjs().add(1, "month").toISOString(),
        ...payload,
      },
      // Update the subscription if it exists
      update: {
        planId,
        ...payload,
        ...(isUpdate
          ? {
              billingCycleStart: dayjs().add(1, "month").toISOString(),
              cancelled: body.data.attributes.cancelled ?? false,
              paused: body.data.attributes.cancelled ?? false,
            }
          : {}),
      },
      where: {
        userId,
      },
    });
  },
});
