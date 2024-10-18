// UpStash
import crypto from "crypto";
import { serve } from "@upstash/qstash/nextjs";
import { NextRequest } from "next/server";
import { Receiver } from "@upstash/qstash";
// Prisma
import prisma from "libs/prisma";
// Utils

import dayjs from "dayjs";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";

const { getSubscriptionEvents, getFormPlanByVariantId } = config.plans;

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
      variant_id: number;
    };
  };
}

export const POST = async (req: NextRequest) => {
  const text = await req.text();
  const hmac = crypto.createHmac(
    "sha256",
    process.env.LEMONSQUEEZY_SIGNATURE_SECRET ?? "",
  );
  const digest = Buffer.from(hmac.update(text).digest("hex"), "utf8");
  const signature = Buffer.from(
    req.headers.get("x-signature") as string,
    "utf8",
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    return new Response("Invalid signature.", {
      status: 400,
    });
  }

  const body = JSON.parse(text) as ResponseBody;

  const handler = serve(
    async (context) => {
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

  return await handler(req);
};
