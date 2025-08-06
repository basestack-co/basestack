// Types
import { type FormPlan, PlanTypeId } from "../../types";

const forms: FormPlan[] = [
  {
    id: PlanTypeId.USAGE,
    name: "Usage",
    slogan: "Pay as you go",
    description:
      "Collect form submissions easily with our no-code solution. Basestack Forms handles the data securely so you can focus on what matters.",
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
      sandbox: ["1341e824-dad2-4169-a170-39932d90ffb0"],
      production: ["96852088-287e-4142-ad7d-d0c5cfed3c0a"],
    },
    meters: [
      {
        key: "form_submission",
        costUnit: 0.01,
        currency: "USD",
      },
      {
        key: "email_notification",
        costUnit: 0.002,
        currency: "USD",
      },
      {
        key: "spam_check",
        costUnit: 0.002,
        currency: "USD",
      },
      {
        key: "webhook_trigger",
        costUnit: 0.002,
        currency: "USD",
      },
      {
        key: "integration_call",
        costUnit: 0.005,
        currency: "USD",
      },
    ],
    limits: {
      forms: Infinity,
      submissions: Infinity,
      teams: Infinity,
      members: Infinity,
      spams: Infinity,
      fileUploadLimit: Infinity,
      integrationsCalls: Infinity,
    },
    features: {
      hasFileUploads: true,
      hasDataQueryString: true,
      hasCustomUrls: true,
      hasRules: true,
      hasEmailNotifications: true,
      hasBlockIPs: true,
      hasWebhooks: true,
      hasWebsites: true,
      hasCustomExport: true,
      hasAutoResponses: true,
      hasIntegrations: true,
      hasCustomEmailTemplates: true,
      hasSpamProtection: true,
    },
  },
];

const getFormPlanLimitsDefaults = () => ({
  forms: 0,
  submissions: 0,
  teams: 0,
  members: 0,
  spams: 0,
  fileUploadLimit: 0,
  integrationsCalls: 0,
});

export const config = {
  forms,
  getFormPlanLimitsDefaults,
};
