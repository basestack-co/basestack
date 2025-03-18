// UpStash
import { serve } from "@upstash/workflow/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { UpdateSubscriptionEventPayload } from "libs/qstash";
// Prisma
import { prisma } from "server/db";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, SubscriptionEvent } from "@basestack/utils";

export const { POST } = serve<UpdateSubscriptionEventPayload>(
  async (context) => {
    const body = context.requestPayload;

    console.info(`Job: Update Forms Subscriptions - Webhook Event Body`, body);
    console.info(`Subscription Event:${body.meta.event_name}`);

    await context.run("update-user-subscription-step", async () => {
      const userId = body.meta.custom_data.user_id;

      const isUpdate =
        SubscriptionEvent.SUBSCRIPTION_UPDATED === body.meta.event_name;

      const planId = (body.meta.custom_data.plan_id ??
        PlanTypeId.FREE) as PlanTypeId;

      const payload = {
        subscriptionId: body.data.id,
        customerId: body.data.attributes.customer_id,
        status: body.data.attributes.status,
        productId: body.data.attributes.product_id,
        event: body.meta.event_name,
        variantId: body.data.attributes.variant_id,
      };

      const res = await prisma.subscription.upsert({
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

      console.info(
        "Job: Update Forms Subscriptions - Subscription updated on DB",
        res,
      );
    });
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
    failureFunction: async ({
      context,
      failStatus,
      failResponse,
      failHeaders,
    }) => {
      console.error(
        `Job: Update Forms Subscriptions - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
      );
    },
  },
);
