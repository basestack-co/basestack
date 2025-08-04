// Types
import { type FormsPermission, PlanTypeId, type UptimePlan } from "../../types";

const uptime: UptimePlan[] = [
  {
    id: PlanTypeId.USAGE,
    name: "Usage",
    slogan: "Pay as you go",
    description: "Monitor your website's uptime and performance",
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
      sandbox: [],
      production: [],
    },
    meters: [
      {
        key: "email_notification",
        costUnit: 0.002,
        currency: "USD",
      },
    ],
    limits: {
      teams: Infinity,
      members: Infinity,
      apiRequests: Infinity,
    },
    features: {
      hasBlockIPs: true,
    },
  },
];

const uptimePermissions: Record<string, FormsPermission[]> = {
  ADMIN: [],
  DEVELOPER: [],
  TESTER: [],
  VIEWER: [],
};

const hasUptimePermission = (
  role: string | undefined,
  permission: FormsPermission,
): boolean => {
  return uptimePermissions[role ?? "VIEWER"]?.includes(permission) ?? false;
};

const getFormPlanLimitsDefaults = () => ({
  teams: 0,
  members: 0,
});

export const config = {
  uptime,
  uptimePermissions,
  getFormPlanLimitsDefaults,
  hasUptimePermission,
};
