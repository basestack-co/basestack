// Types
import { PlanTypeId, FormPlan } from "../../types";

// Forms Plan configuration

const forms: FormPlan[] = [
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
      forms: 100,
      submissions: 10000,
      members: 100,
      spams: 10000,
      fileUploadLimit: 1, // GB
      integrationsCalls: 500,
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
      forms: 1,
      submissions: 25,
      members: 0,
      spams: 0,
      fileUploadLimit: 0, // GB
      integrationsCalls: 0,
    },
    features: {
      hasFileUploads: false,
      hasDataQueryString: false,
      hasCustomUrls: false,
      hasRules: false,
      hasEmailNotifications: false,
      hasBlockIPs: false,
      hasWebhooks: false,
      hasWebsites: false,
      hasCustomExport: false,
      hasAutoResponses: false,
      hasIntegrations: false,
      hasCustomEmailTemplates: false,
      hasSpamProtection: false,
    },
  },
  {
    id: PlanTypeId.HOBBY,
    name: "Hobby",
    price: {
      monthly: {
        amount: 5,
        currency: "USD",
        variantId: 368586,
      },
      yearly: {
        amount: 4, // 20% off
        currency: "USD",
        variantId: 368587,
      },
    },
    limits: {
      forms: 5,
      submissions: 500,
      members: 2,
      spams: 1000,
      fileUploadLimit: 0.5, // GB
      integrationsCalls: 100,
    },
    features: {
      hasFileUploads: false,
      hasDataQueryString: false,
      hasCustomUrls: true,
      hasRules: false,
      hasEmailNotifications: false,
      hasBlockIPs: false,
      hasWebhooks: false,
      hasWebsites: false,
      hasCustomExport: true,
      hasAutoResponses: false,
      hasIntegrations: true,
      hasCustomEmailTemplates: false,
      hasSpamProtection: true,
    },
  },
  {
    id: PlanTypeId.LAUNCH,
    name: "Launch",
    price: {
      monthly: {
        amount: 49,
        currency: "USD",
        variantId: 368595,
      },
      yearly: {
        amount: 39, // 20% off
        currency: "USD",
        variantId: 368596,
      },
    },
    limits: {
      forms: Infinity,
      submissions: 2000,
      members: 5,
      spams: 2000,
      fileUploadLimit: 1, // GB
      integrationsCalls: 500, // Calls
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
      hasCustomEmailTemplates: false,
      hasSpamProtection: true,
    },
  },
  {
    id: PlanTypeId.SCALE,
    name: "Scale",
    price: {
      monthly: {
        amount: 99,
        currency: "USD",
        variantId: 368599,
      },
      yearly: {
        amount: 79, // 20% off
        currency: "USD",
        variantId: 368600,
      },
    },
    limits: {
      forms: Infinity,
      submissions: 100000,
      members: 20,
      spams: 100000,
      fileUploadLimit: 10, // GB
      integrationsCalls: 10000, // Calls
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
  submissions: 0,
  spams: 0,
  fileUploadLimit: 0,
  integrationsCalls: 0,
});

const isValidFormPlan = (id: PlanTypeId) => {
  return forms.some((plan) => plan.id === id);
};

const getFormPlan = (id: PlanTypeId): FormPlan => {
  const plan = forms.find((plan: FormPlan) => plan.id === id);
  if (!plan) {
    // Fallback to free plan if plan is not found
    return forms.find((plan: FormPlan) => plan.id === PlanTypeId.FREE)!;
  }
  return plan;
};

const getFormPlanLimits = (id: PlanTypeId) => {
  const plan = getFormPlan(id);
  return plan.limits;
};

const getFormPlanFeatures = (id: PlanTypeId) => {
  const plan = getFormPlan(id);
  return plan.features;
};

const hasFormPlanFeature = (
  id: PlanTypeId,
  feature: keyof FormPlan["features"],
) => {
  const plan = getFormPlan(id);
  return plan.features[feature];
};

const getFormLimitByKey = (id: PlanTypeId, limit: keyof FormPlan["limits"]) => {
  const plan = getFormPlan(id);
  return plan?.limits[limit];
};

const isUnderFormPlanLimit = (
  id: PlanTypeId,
  limit: keyof FormPlan["limits"],
  value: number,
) => {
  const plan = getFormPlan(id);
  return plan?.limits[limit] >= value;
};

const getFormPlanVariantId = (
  id: PlanTypeId,
  interval: "monthly" | "yearly",
) => {
  const plan = getFormPlan(id);
  return plan.price[interval].variantId;
};

const getFormPlanByVariantId = (variantId: number) => {
  return forms.find((plan) => {
    return plan.price.monthly.variantId === variantId;
  });
};

export const config = {
  forms,
  getFormPlan,
  getFormPlanLimits,
  getFormPlanFeatures,
  hasFormPlanFeature,
  getFormLimitByKey,
  isUnderFormPlanLimit,
  getFormPlanLimitsDefaults,
  getFormPlanVariantId,
  getFormPlanByVariantId,
  isValidFormPlan,
};
