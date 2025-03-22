import { NextRequest } from "next/server";
// Utils
import crypto from "crypto";
import { PlanTypeId, SubscriptionEvent } from "@basestack/utils";
// Types
import { UpdateSubscriptionEventPayload } from "../types";

export interface CreateSubscriptionEventArgs {
  req: NextRequest;
  signature: string;
  product: string;
  getPlan: (
    variantId: number,
    isBilledMonthly: boolean,
  ) => { id: PlanTypeId; name: string } | null;
  onSubscriptionUpdated: (data: {
    userId: string;
    planId: PlanTypeId;
    cancelled: boolean;
    paused: boolean;
    payload: {
      subscriptionId: string;
      customerId: number;
      status: string;
      productId: number;
      event: SubscriptionEvent;
      variantId: number;
    };
  }) => Promise<void>;
}

const verifySignature = (
  req: NextRequest,
  rawBody: string,
  secret: string,
): boolean => {
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  const digest = Buffer.from(hmac, "utf8");
  const signature = req.headers.get("x-signature");

  return signature
    ? crypto.timingSafeEqual(digest, Buffer.from(signature, "utf8"))
    : false;
};

export const createSubscriptionEvent = async ({
  req,
  signature,
  product,
  getPlan,
  onSubscriptionUpdated,
}: CreateSubscriptionEventArgs): Promise<Response> => {
  try {
    const rawBody = await req.text();
    if (!verifySignature(req, rawBody, signature)) {
      return new Response(
        `LS Webhook: Basestack ${product} - Invalid signature.`,
        {
          status: 400,
        },
      );
    }

    const body: UpdateSubscriptionEventPayload = JSON.parse(rawBody);
    const { attributes, id } = body.data;
    const { meta } = body;

    const isBilledMonthly = attributes.variant_name === "Monthly";
    const variantId = attributes.variant_id;
    const event = meta.event_name as SubscriptionEvent;
    const plan = getPlan(variantId, isBilledMonthly);

    if (!plan) {
      return new Response(
        `LS Webhook: Basestack ${product} - No valid plan found for variant ID: ${variantId} and isBilledMonthly: ${isBilledMonthly} no subscription will be updated.`,
        {
          status: 200,
        },
      );
    }

    const userId = meta.custom_data?.user_id;
    const planId = (meta.custom_data?.plan_id ?? PlanTypeId.FREE) as PlanTypeId;

    if (!userId) {
      return new Response(
        `LS Webhook: Basestack ${product} - Missing user ID.`,
        {
          status: 400,
        },
      );
    }

    const payload = {
      subscriptionId: id,
      customerId: attributes.customer_id,
      status: attributes.status,
      productId: attributes.product_id,
      event,
      variantId,
    };

    if (event === SubscriptionEvent.SUBSCRIPTION_UPDATED) {
      console.info(
        `LS Webhook: Basestack ${product} - Updating subscription for user ID: ${userId} with plan ID: ${planId} and payload: ${JSON.stringify(payload)}`,
      );

      const cancelled = attributes.cancelled ?? false;
      const paused = attributes.cancelled ?? false;

      await onSubscriptionUpdated({
        userId,
        planId: plan.id,
        payload,
        cancelled,
        paused,
      });
    } else {
      return new Response(
        `LS Webhook: Basestack ${product} - Unsupported subscription event.`,
        { status: 400 },
      );
    }

    return new Response(
      `LS Webhook: Basestack ${product} - Subscription event processed successfully.`,
      { status: 200 },
    );
  } catch (e) {
    console.error(
      `LS Webhook: Basestack ${product} - Error processing subscription event:`,
      e,
    );
    return new Response(
      `LS Webhook: Basestack ${product} - Internal server error.`,
      {
        status: 500,
      },
    );
  }
};
