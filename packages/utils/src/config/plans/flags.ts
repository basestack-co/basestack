// Types
import { PlanTypeId, FlagsPlan, FlagsPermission } from "../../types";

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
        variantIds: {
          local: 0,
          development: 0,
          production: 0,
        },
      },
      yearly: {
        amount: 0,
        currency: "USD",
        variantIds: {
          local: 0,
          development: 0,
          production: 0,
        },
      },
    },
    limits: {
      projects: 1,
      environments: 1,
      flags: 10,
      segments: 0,
      rollouts: 0,
      teams: 0,
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
        variantIds: {
          local: 695368,
          development: 695368,
          production: 716243,
        },
      },
      yearly: {
        amount: 7.65, // 15% off
        currency: "USD",
        variantIds: {
          local: 695369,
          development: 695369,
          production: 716244,
        },
      },
    },
    limits: {
      projects: 5,
      environments: Infinity,
      flags: 500,
      segments: 0,
      rollouts: 0,
      teams: 0,
      members: 0,
      apiRequests: 500000,
    },
    features: {
      hasHistory: false,
      hasBlockIPs: true,
      hasRollouts: false,
      hasSegments: false,
      hasWebsites: true,
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
        variantIds: {
          local: 695372,
          development: 695372,
          production: 716246,
        },
      },
      yearly: {
        amount: 41.65, // 15% off
        currency: "USD",
        variantIds: {
          local: 695373,
          development: 695373,
          production: 716247,
        },
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: 5,
      rollouts: 10,
      teams: 1,
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
        variantIds: {
          local: 695376,
          development: 695376,
          production: 716249,
        },
      },
      yearly: {
        amount: 101.15, // 15% off
        currency: "USD",
        variantIds: {
          local: 695377,
          development: 695377,
          production: 716250,
        },
      },
    },
    limits: {
      projects: Infinity,
      environments: Infinity,
      flags: Infinity,
      segments: Infinity,
      rollouts: Infinity,
      teams: 5,
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
        variantIds: {
          local: 0,
          development: 0,
          production: 0,
        },
      },
      yearly: {
        amount: Infinity,
        currency: "USD",
        variantIds: {
          local: 0,
          development: 0,
          production: 0,
        },
      },
    },
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

const flagsPermissions: Record<string, FlagsPermission[]> = {
  ADMIN: [
    "view_project_flags",
    "view_project_keys",
    "view_project_environments",
    "view_project_security",
    "add_project_flags",
    "add_project_member",
    "add_project_environment",
    "edit_project_flags",
    "edit_project_name",
    "edit_project_environment",
    "delete_project_flags",
    "delete_project",
    "delete_project_environment",
    "add_team",
  ],
  DEVELOPER: [
    "view_project_flags",
    "view_project_keys",
    "view_project_security",
    "view_project_environments",
    "add_project_flags",
    "add_project_environment",
    "edit_project_flags",
    "edit_project_environment",
    "delete_project_environment",
  ],
  TESTER: [
    "view_project_flags",
    "view_project_keys",
    "add_project_flags",
    "edit_project_flags",
  ],
  VIEWER: ["view_project_flags"],
};

const hasFlagsPermission = (
  role: string | undefined,
  permission: FlagsPermission
): boolean => {
  return flagsPermissions[role ?? "VIEWER"]?.includes(permission) ?? false;
};

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
  flagsPermissions,
  getFlagsPlanLimitsDefaults,
  hasFlagsPermission,
};
