// UpStash
import { NextRequest } from "next/server";
import {
  UpdateSubscriptionEventPayload,
  updateSubscriptionEvent,
} from "libs/qstash";
// Utils
import crypto from "crypto";
import { PlanTypeId, config, SubscriptionEvent } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";

const { getFormPlanByVariantId } = config.plans;

export async function POST(req: NextRequest) {
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
  const plan = getFormPlanByVariantId(variantId, isBilledMonthly, AppMode);

  const isValidEvent = [SubscriptionEvent.SUBSCRIPTION_UPDATED].includes(
    body.meta.event_name as SubscriptionEvent,
  );

  // Only trigger job if the event and plan on the request is valid
  if (isValidEvent && !!plan) {
    await updateSubscriptionEvent(body);
  }

  return new Response(
    "Basestack Forms: Update subscription event job successfully started.",
    {
      status: 200,
    },
  );
}
