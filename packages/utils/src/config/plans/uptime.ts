// Types
import { PlanTypeId, type UptimePlan } from "../../types";

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
      sandbox: ["7b7cd734-dd98-4ca5-8845-a5ad867e2f0b"],
      production: [],
    },
    meters: [
      {
        key: "api_requests",
        costUnit: 0.00007,
        currency: "USD",
      },
      {
        key: "email_notification",
        costUnit: 0.002,
        currency: "USD",
      },
      {
        key: "webhook_trigger",
        costUnit: 0.002,
        currency: "USD",
      },
    ],
    limits: {
      projects: Infinity,
      monitors: Infinity,
      subscribers: Infinity,
      teams: Infinity,
      members: Infinity,
      apiRequests: Infinity,
      statusPages: Infinity,
      incidents: Infinity,
    },
    features: {
      hasWebhooks: true,
    },
  },
];

const getUptimePlanLimitsDefaults = () => ({
  projects: 0,
  monitors: 0,
  subscribers: 0,
  teams: 0,
  members: 0,
  apiRequests: 0,
});

export const config = {
  uptime,
  getUptimePlanLimitsDefaults,
};
