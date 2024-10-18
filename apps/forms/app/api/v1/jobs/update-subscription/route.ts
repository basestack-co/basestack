// UpStash
import { serve } from "@upstash/qstash/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { UpdateSubscriptionEventPayload } from "libs/qstash";
// Prisma
import prisma from "libs/prisma";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getSubscriptionEvents, getFormPlanByVariantId } = config.plans;

export const POST = serve<UpdateSubscriptionEventPayload>(
  async (context) => {
    const body = context.requestPayload;

    console.info(`Webhook Event Body`, body);
    console.info(`Subscription Event:${body.meta.event_name}`);

    if (!getSubscriptionEvents.includes(body.meta.event_name)) {
      console.error("Invalid event name received");
      return;
    }

    if (
      [
        SubscriptionEvent.SUBSCRIPTION_UPDATED,
        SubscriptionEvent.SUBSCRIPTION_CREATED,
        SubscriptionEvent.SUBSCRIPTION_CANCELLED,
      ].includes(body.meta.event_name as SubscriptionEvent)
    ) {
      await context.run("update-user-subscription-step", async () => {
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

        console.info("Subscription updated on DB", res);
      });
    }
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
  },
);
