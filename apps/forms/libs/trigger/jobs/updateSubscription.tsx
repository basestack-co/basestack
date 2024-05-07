import { verifyRequestSignature } from "@trigger.dev/sdk";
import { triggerClient } from "libs/trigger";
// Prisma
import prisma from "libs/prisma";
// Utils
import { SubscriptionEvent } from "@basestack/utils/src";
import { PlanTypeId, config } from "@basestack/utils";

interface ResponseBody {
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
    };
  };
}

const lemonSqueezyDotCom = triggerClient.defineHttpEndpoint({
  id: "lemonsqueezy.com",
  source: "lemonsqueezy.com",
  verify: async (request) => {
    return await verifyRequestSignature({
      request,
      headerName: "X-Signature",
      secret: process.env.LEMONSQUEEZY_SIGNATURE_SECRET!,
      algorithm: "sha256",
    });
  },
});

triggerClient.defineJob({
  id: "http-update-subscription",
  name: "HTTP Update Subscription",
  version: "1.0.0",
  trigger: lemonSqueezyDotCom.onRequest(),
  run: async (request, io, ctx) => {
    const body: ResponseBody = await request.json();

    await io.logger.info(`Webhook Event Body`, body);

    if (!config.plans.getSubscriptionEvents.includes(body.meta.event_name)) {
      await io.logger.error("Invalid event name received");
      return;
    }

    await io.runTask(
      "check-and-update-subscription-db",
      async () => {
        const isUpdate = [SubscriptionEvent.SUBSCRIPTION_UPDATED].includes(
          body.meta.event_name as SubscriptionEvent,
        );
        const userId = body.meta.custom_data.user_id;
        const planId = (body.meta.custom_data.plan_id ??
          PlanTypeId.FREE) as PlanTypeId;

        const payload = {
          planId,
          subscriptionId: body.data.id,
          customerId: body.data.attributes.customer_id,
          status: body.data.attributes.status,
          productId: body.data.attributes.product_id,
          event: body.meta.event_name,
        };

        const res = await prisma.subscription.upsert({
          create: {
            userId,
            billingCycleStart: new Date(),
            ...payload,
          },
          update: {
            ...payload,
            ...(isUpdate
              ? {
                  billingCycleStart: new Date(),
                  cancelled: body.data.attributes.cancelled ?? false,
                  paused: body.data.attributes.cancelled ?? false,
                }
              : {}),
          },
          where: {
            userId,
          },
        });

        await io.logger.info("Subscription updated on DB", res);
      },
      { name: "Check if the Subscription needs updating" },
    );

    await io.logger.info("✨ Subscription updated ✨");
  },
});
