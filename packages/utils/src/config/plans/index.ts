// Plans Configs
import { config as formsConfig } from "./forms";
import { config as flagsConfig } from "./flags";
// Types
import { Product, PlanTypeId, FormPlan, FlagsPlan } from "../../types";

const getSubscriptionEvents = [
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_resumed",
  "subscription_expired",
  "subscription_paused",
  "subscription_unpaused",
  "subscription_payment_failed",
  "subscription_payment_success",
  "subscription_payment_recovered",
  "subscription_payment_refunded",
  "subscription_plan_changed",
];

const currentPlans = {
  forms: formsConfig.forms,
  flags: flagsConfig.flags,
};

export const getAppMode = (mode: string) => {
  return (
    ["development", "production", "local"].includes(mode) ? mode : "production"
  ) as "local" | "development" | "production";
};

const isValidPlan = (product: Product, id: PlanTypeId) => {
  return currentPlans[product].some((plan) => plan.id === id);
};

const getPlan = (product: Product, id: PlanTypeId): FormPlan | FlagsPlan => {
  const plan = currentPlans[product].find(
    (plan: FormPlan | FlagsPlan) => plan.id === id,
  );
  if (!plan) {
    // Fallback to free plan if plan is not found
    return currentPlans[product].find(
      (plan: FormPlan | FlagsPlan) => plan.id === PlanTypeId.FREE,
    )!;
  }
  return plan;
};

const getPlanLimits = (
  product: Product,
  id: PlanTypeId,
): FlagsPlan["limits"] | FormPlan["limits"] => {
  const plan = getPlan(product, id);
  return plan.limits;
};

const getPlanFeatures = (
  product: Product,
  id: PlanTypeId,
): FlagsPlan["features"] | FormPlan["features"] => {
  const plan = getPlan(product, id);
  return plan.features;
};

const hasPlanFeature = (
  product: Product,
  id: PlanTypeId,
  feature: keyof FormPlan["features"] | keyof FlagsPlan["features"],
) => {
  const plan = getPlan(product, id);
  return plan.features[feature as keyof typeof plan.features];
};

const getPlanLimitByKey = (
  product: Product,
  id: PlanTypeId,
  limit: keyof FormPlan["limits"] | keyof FlagsPlan["limits"],
) => {
  const plan = getPlan(product, id);
  return plan.limits[limit as keyof typeof plan.limits];
};

const isUnderPlanLimit = (
  product: Product,
  id: PlanTypeId,
  limit: keyof FormPlan["limits"] | keyof FlagsPlan["limits"],
  value: number,
) => {
  const plan = getPlan(product, id);
  return plan.limits[limit as keyof typeof plan.limits] >= value;
};

const getPlanVariantId = (
  product: Product,
  id: PlanTypeId,
  interval: "monthly" | "yearly",
  mode: string = "production",
) => {
  const stage = getAppMode(mode);
  const plan = getPlan(product, id);
  return plan.price[interval].variantIds[stage];
};

const getPlanByVariantId = (
  product: Product,
  variantId: number,
  isBilledMonthly: boolean = false,
  mode: string = "production",
) => {
  const stage = getAppMode(mode);

  return currentPlans[product].find(
    (plan) =>
      plan.price[isBilledMonthly ? "monthly" : "yearly"].variantIds[stage] ===
      variantId,
  );
};

const getLimitByKey = (
  product: Product,
  id: PlanTypeId,
  limit: keyof FormPlan["limits"] | keyof FlagsPlan["limits"],
): number => {
  const plan = getPlan(product, id);
  return plan?.limits[limit as keyof typeof plan.limits] || 0;
};

export const plans = {
  getSubscriptionEvents,
  ...formsConfig,
  ...flagsConfig,
  isValidPlan,
  getPlan,
  getPlanLimits,
  getPlanFeatures,
  hasPlanFeature,
  getPlanLimitByKey,
  isUnderPlanLimit,
  getPlanVariantId,
  getPlanByVariantId,
  getLimitByKey,
};
