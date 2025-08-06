// Types
import {
  type FlagsPlan,
  type FormPlan,
  type PlanProduct,
  PlanTypeId,
  type Product,
  type UptimePlan,
} from "../../types";
import { config as flagsConfig } from "./flags";
import { config as formsConfig } from "./forms";
import { config as uptimeConfig } from "./uptime";

const currentPlans = {
  forms: formsConfig.forms,
  flags: flagsConfig.flags,
  uptime: uptimeConfig.uptime,
};

export const getAppMode = (mode: string) => {
  return (
    ["development", "production", "local"].includes(mode) ? mode : "production"
  ) as "local" | "development" | "production";
};

const isValidPlan = (product: Product, id: PlanTypeId) => {
  return currentPlans[product].some((plan) => plan.id === id);
};

const getPlan = (
  product: Product,
  id: PlanTypeId,
): FormPlan | FlagsPlan | UptimePlan => {
  const plan = currentPlans[product].find(
    (plan: FormPlan | FlagsPlan | UptimePlan) => plan.id === id,
  );
  if (!plan) {
    // Fallback to free plan if plan is not found
    return currentPlans[product].find(
      (plan: FormPlan | FlagsPlan | UptimePlan) => plan.id === PlanTypeId.FREE,
    )!;
  }
  return plan;
};

const getPlanLimits = (
  product: Product,
  id: PlanTypeId,
): FlagsPlan["limits"] | FormPlan["limits"] | UptimePlan["limits"] => {
  const plan = getPlan(product, id);
  return plan.limits;
};

const getPlanFeatures = (
  product: Product,
  id: PlanTypeId,
): FlagsPlan["features"] | FormPlan["features"] | UptimePlan["features"] => {
  const plan = getPlan(product, id);
  return plan.features;
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

const getPlanMeters = (product: Product, id: PlanTypeId) => {
  const plan = getPlan(product, id);
  return plan.meters;
};

export const plans = {
  ...formsConfig,
  ...flagsConfig,
  ...uptimeConfig,
  isValidPlan,
  getPlan,
  getPlanLimits,
  getPlanFeatures,
  getPlanProducts,
  getMetersEstimatedCost,
  getPlanMeters,
};
