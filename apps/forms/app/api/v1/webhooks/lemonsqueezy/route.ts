// UpStash
import { NextRequest } from "next/server";
// Vendors
import { lemonsqueezy } from "@basestack/vendors";
// Utils
import { config } from "@basestack/utils";
import { AppMode } from "utils/helpers/general";

const { getFormPlanByVariantId } = config.plans;

export async function POST(req: NextRequest) {
  return lemonsqueezy.webhook.createSubscriptionEvent({
    req,
    product: "Forms",
    getIsValidPlan: (variantId, isBilledMonthly) =>
      !!getFormPlanByVariantId(variantId, isBilledMonthly, AppMode),
  });
}
