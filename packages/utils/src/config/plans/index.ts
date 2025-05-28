// Plans Configs
import { config as formsConfig } from "./forms";
import { config as flagsConfig } from "./flags";
// Types
import {
  Product,
  PlanTypeId,
  FormPlan,
  FlagsPlan,
  PlanProduct,
} from "../../types";

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

const getLimitByKey = (
  product: Product,
  id: PlanTypeId,
  limit: keyof FormPlan["limits"] | keyof FlagsPlan["limits"],
): number => {
  const plan = getPlan(product, id);
  return plan?.limits[limit as keyof typeof plan.limits] || 0;
};

const getPlanProducts = (product: Product, id: PlanTypeId): PlanProduct => {
  const plan = getPlan(product, id);
  return plan.products;
};

const getMetersEstimatedCost = (
  product: Product,
  id: PlanTypeId,
  usage: Record<string, number>,
) => {
  const plan = getPlan(product, id);

  return Object.entries(usage).reduce((total, [key, units]) => {
    const meter = plan.meters.find((m) => m.key === key);
    const cost = units * (meter?.costUnit ?? 0);
    return total + cost;
  }, 0);
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
  getLimitByKey,
  getPlanProducts,
  getMetersEstimatedCost,
};
