// Types
import { PlanTypeId, FlagsPlan } from "../../types";

// Flags Plan configuration

const flags: FlagsPlan[] = [
  {
    id: PlanTypeId.PREVIEW,
    name: "Preview",
    price: {
      monthly: {
        amount: 0,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: 0,
        currency: "USD",
        variantId: 0,
      },
    },
    limits: {
      projects: 10,
      environments: 10,
      flags: 100,
      members: 20,
    },
    features: {
      hasHistory: true,
      hasBlockIPs: true,
      hasRollouts: true,
      hasSegments: true,
      hasWebsites: true,
      hasTags: true,
      hasRemoteConfig: true,
      hasPreviewFeatures: true,
    },
  },
  {
    id: PlanTypeId.FREE,
    name: "Free",
    price: {
      monthly: {
        amount: 0,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: 0,
        currency: "USD",
        variantId: 0,
      },
    },
    limits: {
      projects: 1,
      environments: 1,
      flags: 5,
      members: 0,
    },
    features: {
      hasHistory: false,
      hasBlockIPs: false,
      hasRollouts: false,
      hasSegments: false,
      hasWebsites: false,
      hasTags: false,
      hasRemoteConfig: false,
      hasPreviewFeatures: false,
    },
  },
  {
    id: PlanTypeId.HOBBY,
    name: "Hobby",
    price: {
      monthly: {
        amount: 5,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: 4, // 20% off
        currency: "USD",
        variantId: 0,
      },
    },
    limits: {
      projects: 5,
      environments: 2,
      flags: 200,
      members: 0,
    },
    features: {
      hasHistory: false,
      hasBlockIPs: false,
      hasRollouts: false,
      hasSegments: false,
      hasWebsites: false,
      hasTags: false,
      hasRemoteConfig: false,
      hasPreviewFeatures: false,
    },
  },
  {
    id: PlanTypeId.LAUNCH,
    name: "Launch",
    price: {
      monthly: {
        amount: 49,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: 39, // 20% off
        currency: "USD",
        variantId: 0,
      },
    },
    limits: {
      projects: Infinity,
      environments: 3,
      flags: Infinity,
      members: 0,
    },
    features: {
      hasHistory: false,
      hasBlockIPs: true,
      hasRollouts: false,
      hasSegments: false,
      hasWebsites: true,
      hasTags: false,
      hasRemoteConfig: true,
      hasPreviewFeatures: false,
    },
  },
  {
    id: PlanTypeId.SCALE,
    name: "Scale",
    price: {
      monthly: {
        amount: 99,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: 79, // 20% off
        currency: "USD",
        variantId: 0,
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      members: 20,
    },
    features: {
      hasHistory: true,
      hasBlockIPs: true,
      hasRollouts: true,
      hasSegments: true,
      hasWebsites: true,
      hasTags: true,
      hasRemoteConfig: true,
      hasPreviewFeatures: true,
    },
  },
];

const isValidFlagsPlan = (id: PlanTypeId) => {
  return flags.some((plan) => plan.id === id);
};

const getFlagsPlan = (id: PlanTypeId): FlagsPlan => {
  const plan = flags.find((plan: FlagsPlan) => plan.id === id);
  if (!plan) {
    // Fallback to free plan if plan is not found
    return flags.find((plan: FlagsPlan) => plan.id === PlanTypeId.FREE)!;
  }
  return plan;
};

const getFlagsPlanLimits = (id: PlanTypeId) => {
  const plan = getFlagsPlan(id);
  return plan.limits;
};

const getFlagsPlanFeatures = (id: PlanTypeId) => {
  const plan = getFlagsPlan(id);
  return plan.features;
};

const hasFlagsPlanFeature = (
  id: PlanTypeId,
  feature: keyof FlagsPlan["features"],
) => {
  const plan = getFlagsPlan(id);
  return plan.features[feature];
};

const getFlagsLimitByKey = (
  id: PlanTypeId,
  limit: keyof FlagsPlan["limits"],
) => {
  const plan = getFlagsPlan(id);
  return plan?.limits[limit];
};

const isUnderFlagsPlanLimit = (
  id: PlanTypeId,
  limit: keyof FlagsPlan["limits"],
  value: number,
) => {
  const plan = getFlagsPlan(id);
  return plan?.limits[limit] >= value;
};

const getFlagsPlanVariantId = (
  id: PlanTypeId,
  interval: "monthly" | "yearly",
) => {
  const plan = getFlagsPlan(id);
  return plan.price[interval].variantId;
};

const getFlagsPlanByVariantId = (variantId: number) => {
  return flags.find((plan) => {
    return plan.price.monthly.variantId === variantId;
  });
};

export const config = {
  flags,
  getFlagsPlan,
  getFlagsPlanLimits,
  getFlagsPlanFeatures,
  hasFlagsPlanFeature,
  getFlagsLimitByKey,
  isUnderFlagsPlanLimit,
  getFlagsPlanVariantId,
  getFlagsPlanByVariantId,
  isValidFlagsPlan,
};
