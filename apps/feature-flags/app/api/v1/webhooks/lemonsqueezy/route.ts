import { NextRequest } from "next/server";
// Vendors
import { lemonsqueezy } from "@basestack/vendors";
// Utils
import { config } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";

const { getFlagsPlanByVariantId } = config.plans;

export async function POST(req: NextRequest) {
  return lemonsqueezy.webhook.createSubscriptionEvent({
    req,
    product: "Feature Flags",
    getIsValidPlan: (variantId, isBilledMonthly) =>
      !!getFlagsPlanByVariantId(variantId, isBilledMonthly, AppMode),
  });
}
