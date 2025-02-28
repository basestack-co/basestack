// Types
import { PlanTypeId, FlagsPlan } from "../../types";

// Flags Plan configuration

const flags: FlagsPlan[] = [
  {
    id: PlanTypeId.FREE,
    name: "Free",
    slogan: "Get started with feature flags at no cost.",
    description:
      "Get started with feature flags at no cost. Manage up to 10 feature flags in 1 project with 50,000 API requests per month. Ideal for small experiments and personal projects. Does not include segments, rollouts, or advanced features.",
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
      environments: 0,
      flags: 10,
      segments: 0,
      rollouts: 0,
      members: 0,
      apiRequests: 50000,
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
    slogan: "Perfect for indie developers and small teams.",
    description:
      "Perfect for indie developers and small teams. Create up to 500 feature flags across 5 projects with unlimited environments. Supports 500,000 API requests per month. Great for testing features across multiple projects but does not include advanced segmentation or rollouts.",
    price: {
      monthly: {
        amount: 9,
        currency: "USD",
        variantId: 695368,
      },
      yearly: {
        amount: 7.65, // 15% off
        currency: "USD",
        variantId: 695369,
      },
    },
    limits: {
      projects: 5,
      environments: Infinity,
      flags: 500,
      segments: 0,
      rollouts: 0,
      members: 0,
      apiRequests: 500000,
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
    slogan: "Designed for startups and expanding teams.",
    description:
      "Built for startups and growing teams. Get unlimited feature flags and unlimited projects with up to 5 user segments and 10 rollouts. Includes history tracking, remote config, website support, and IP blocking for added security. Comes with 5 team members and 5 million API requests per month.",
    price: {
      monthly: {
        amount: 49,
        currency: "USD",
        variantId: 695372,
      },
      yearly: {
        amount: 41.65, // 15% off
        currency: "USD",
        variantId: 695373,
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: 5,
      rollouts: 10,
      members: 5,
      apiRequests: 5000000,
    },
    features: {
      hasHistory: true,
      hasBlockIPs: true,
      hasRollouts: false,
      hasSegments: true,
      hasWebsites: true,
      hasTags: false,
      hasRemoteConfig: true,
      hasPreviewFeatures: false,
    },
  },
  {
    id: PlanTypeId.SCALE,
    name: "Scale",
    slogan: "The ultimate solution for scaling businesses.",
    description:
      "The ultimate solution for scaling businesses. Enjoy unlimited projects, flags, segments, rollouts, API requests, and 25 team members. Includes full segmentation, advanced rollouts, preview features, remote config, and history tracking. Designed for teams that need flexibility, control, and high performance.",
    price: {
      monthly: {
        amount: 119,
        currency: "USD",
        variantId: 695376,
      },
      yearly: {
        amount: 101.15, // 15% off
        currency: "USD",
        variantId: 695377,
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: Infinity,
      rollouts: Infinity,
      members: 25,
      apiRequests: Infinity,
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
    id: PlanTypeId.ENTERPRISE,
    name: "Enterprise",
    slogan:
      "Tailored for larger workloads, with top-tier compliance and security.",
    description:
      "Our Enterprise solution provides a private instance of our platform, deployed in your chosen region. Fully managed by us, it remains completely isolated and secure, tailored to meet your specific requirements.",
    price: {
      monthly: {
        amount: Infinity,
        currency: "USD",
        variantId: 0,
      },
      yearly: {
        amount: Infinity,
        currency: "USD",
        variantId: 695377,
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: Infinity,
      rollouts: Infinity,
      members: Infinity,
      apiRequests: Infinity,
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

const getFlagsPlanLimitsDefaults = () => ({
  projects: 0,
  environments: 0,
  flags: 0,
  segments: 0,
  rollouts: 0,
  members: 0,
  apiRequests: 0,
});

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
  getFlagsPlanLimitsDefaults,
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
