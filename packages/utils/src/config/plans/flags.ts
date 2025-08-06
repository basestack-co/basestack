// Types
import { type FlagsPlan, PlanTypeId } from "../../types";

const flags: FlagsPlan[] = [
  {
    id: PlanTypeId.USAGE,
    name: "Usage",
    slogan: "Pay as you go",
    description:
      "Speed up your development with Feature Flags. Deploy faster, test smarter, and roll out safely. Control features in real time and reduce risks without disrupting users.",
    price: {
      monthly: {
        amount: 5,
        currency: "USD",
      },
      yearly: {
        amount: 0,
        currency: "USD",
      },
    },
    products: {
      sandbox: ["dee76104-d9d0-4270-9077-b93802d37386"],
      production: ["a5c5fb57-240c-4e76-aed7-ea08594f371a"],
    },
    meters: [
      {
        key: "api_requests",
        costUnit: 0.00001,
        currency: "USD",
      },
      {
        key: "email_notification",
        costUnit: 0.002,
        currency: "USD",
      },
    ],
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: Infinity,
      rollouts: Infinity,
      teams: Infinity,
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
  teams: 0,
  members: 0,
  apiRequests: 0,
});

export const config = {
  flags,
  getFlagsPlanLimitsDefaults,
};
