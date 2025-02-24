// UpStash
import { serve } from "@upstash/workflow/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { UpdateSubscriptionEventPayload } from "libs/qstash";
// Prisma
import { prisma } from "server/db";
// Utils
import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getSubscriptionEvents, getFormPlanByVariantId } = config.plans;

export const { POST } = serve<UpdateSubscriptionEventPayload>(
  async (context) => {
    const body = context.requestPayload;

    console.info(`Job: Update Forms Subscriptions - Webhook Event Body`, body);
    console.info(`Subscription Event:${body.meta.event_name}`);

    if (!getSubscriptionEvents.includes(body.meta.event_name)) {
      console.error(
        "Job: Update Forms Subscriptions - Invalid event name received",
      );
      return;
    }

    if (
      [
        SubscriptionEvent.SUBSCRIPTION_UPDATED,
        SubscriptionEvent.SUBSCRIPTION_CREATED,
        SubscriptionEvent.SUBSCRIPTION_CANCELLED,
      ].includes(body.meta.event_name as SubscriptionEvent)
    ) {
      const sub = await context.run(
        "check-user-subscription-step",
        async () => {
          const userId = body.meta.custom_data.user_id;

          console.info(
            "Job: Update Forms Subscriptions - Checking if user has a subscription",
            userId,
          );

          return prisma.subscription.findFirst({
            where: {
              userId,
            },
            select: {
              id: true,
            },
          });
        },
      );

      // Update the subscription if it exists
      if (!!sub?.id) {
        await context.run("update-user-subscription-step", async () => {
          const userId = body.meta.custom_data.user_id;

          const isUpdate =
            SubscriptionEvent.SUBSCRIPTION_UPDATED === body.meta.event_name;

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

          console.info(
            "Job: Update Forms Subscriptions - Subscription updated on DB",
            res,
          );
        });
      } else {
        console.error(
          `Job: Update Forms Subscriptions - Subscription not found for user ${body.meta.custom_data.user_id}`,
        );
      }
    }
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
