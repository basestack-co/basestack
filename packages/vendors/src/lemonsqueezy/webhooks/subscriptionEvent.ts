import { NextRequest } from "next/server";
// Utils
import { updateSubscriptionEvent } from "../../qstash/events";
import crypto from "crypto";
import { SubscriptionEvent } from "@basestack/utils";
// Types
import { UpdateSubscriptionEventPayload } from "../../qstash/types";

export interface CreateSubscriptionEventArgs {
  req: NextRequest;
  product: string;
  getIsValidPlan: (variantId: number, isBilledMonthly: boolean) => boolean;
}

export const createSubscriptionEvent = async ({
  req,
  product,
  getIsValidPlan,
}: CreateSubscriptionEventArgs) => {
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

  const body = JSON.parse(text) as UpdateSubscriptionEventPayload;

  const isBilledMonthly = body.data.attributes.variant_name === "Monthly";
  const variantId = body.data.attributes.variant_id;

  const isValidEvent = [SubscriptionEvent.SUBSCRIPTION_UPDATED].includes(
    body.meta.event_name as SubscriptionEvent,
  );

  const isValidPlan = getIsValidPlan(variantId, isBilledMonthly);

  // Only trigger job if the event and plan on the request is valid
  if (isValidEvent && isValidPlan) {
    await updateSubscriptionEvent(body);
  }

  return new Response(
    `Basestack ${product}: Update subscription event job successfully started.`,
    {
      status: 200,
    },
  );
};
