import { task, logger } from "@trigger.dev/sdk/v3";
// Prisma
import prisma from "libs/prisma";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getSubscriptionEvents, getFormPlanByVariantId } = config.plans;

interface UpdateSubsTaskPayload {
  meta: {
    test_mode: boolean;
    webhook_id: string;
    event_name: string;
    custom_data: {
      plan_id: string;
      user_id: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      customer_id: number;
      status: string;
      ends_at: string;
      renews_at: string;
      product_id: number;
      cancelled: boolean;
      order_id: number;
      paused: boolean;
      variant_id: number;
    };
  };
}

export const updateSubsTask = task({
  id: "http-update-subscription",
  machine: {
    preset: "small-1x",
  },
  init: async (payload) => {
    logger.info(`Webhook Event Body: ${payload}`);
  },
  run: async (body: UpdateSubsTaskPayload) => {
    logger.info(`Subscription Event:${body.meta.event_name}`);

    if (!getSubscriptionEvents.includes(body.meta.event_name)) {
      logger.error("Invalid event name received");
      return;
    }

    if (
      [
        SubscriptionEvent.SUBSCRIPTION_UPDATED,
        SubscriptionEvent.SUBSCRIPTION_CREATED,
        SubscriptionEvent.SUBSCRIPTION_CANCELLED,
      ].includes(body.meta.event_name as SubscriptionEvent)
    ) {
      const isUpdate =
        SubscriptionEvent.SUBSCRIPTION_UPDATED === body.meta.event_name;
      const userId = body.meta.custom_data.user_id;
      const variantId = body.data.attributes.variant_id;

      const payload = {
        subscriptionId: body.data.id,
        customerId: body.data.attributes.customer_id,
        status: body.data.attributes.status,
        productId: body.data.attributes.product_id,
        event: body.meta.event_name,
        variantId,
      };

      const res = await prisma.subscription.upsert({
        create: {
          userId,
          planId: (body.meta.custom_data.plan_id ??
            PlanTypeId.FREE) as PlanTypeId,
          billingCycleStart: dayjs().add(1, "month").toISOString(),
          ...payload,
        },
        update: {
          planId: getFormPlanByVariantId(variantId)?.id,
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

      logger.info("Subscription updated on DB", res);

      return res;
    }
  },
  onSuccess: async () => {
    logger.info("✨ Subscription updated ✨");
  },
});
