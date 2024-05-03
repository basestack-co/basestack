// Types
import { PlanTypeId, Plan } from "../types";

// Forms Plan configuration

const forms: Plan[] = [
  {
    id: PlanTypeId.FREE,
    price: {
      monthly: {
        amount: 0,
        currency: "USD",
        id: "",
      },
      yearly: {
        amount: 0,
        currency: "USD",
        id: "",
      },
    },
    limits: {
      forms: 1,
      submissions: 50,
      members: 1,
      spams: 0,
      fileUploadLimit: 0, // GB
      integrationsCalls: 0,
    },
    features: {
      hasFileUploads: false,
      hasDataQueryString: false,
      hasCustomUrls: false,
      hasRules: false,
      hasNotifications: false,
      hasBlockIPs: false,
      hasWebhooks: false,
      hasWebsites: false,
      hasExport: false,
      hasAutoResponses: false,
      hasIntegrations: false,
      hasCustomEmailTemplates: false,
    },
    content: {
      title: "Free",
      description: "Get started with our free plan.",
      features: [
        {
          text: "100 submissions",
        },
      ],
      action: {
        title: "Get Started",
        url: "https://forms.basestack.co/signup",
      },
    },
  },
  {
    id: PlanTypeId.HOBBY,
    price: {
      monthly: {
        amount: 5,
        currency: "USD",
        id: "",
      },
      yearly: {
        amount: 4, // 20% off
        currency: "USD",
        id: "",
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
      hasNotifications: false,
      hasBlockIPs: false,
      hasWebhooks: false,
      hasWebsites: false,
      hasExport: true,
      hasAutoResponses: false,
      hasIntegrations: true,
      hasCustomEmailTemplates: false,
    },
    content: {
      title: "Hobby",
      description: "Get started with our hobby plan.",
      features: [
        {
          text: "100 submissions",
        },
      ],
      action: {
        title: "Get Started",
        url: "https://forms.basestack.co/signup",
      },
    },
  },
  {
    id: PlanTypeId.LAUNCH,
    price: {
      monthly: {
        amount: 49,
        currency: "USD",
        id: "",
      },
      yearly: {
        amount: 38, // 20% off
        currency: "USD",
        id: "",
      },
    },
    limits: {
      forms: 10,
      submissions: 2000,
      members: 5,
      spams: 0,
      fileUploadLimit: 1, // GB
      integrationsCalls: 500, // Calls
    },
    features: {
      hasFileUploads: true,
      hasDataQueryString: true,
      hasCustomUrls: true,
      hasRules: true,
      hasNotifications: true,
      hasBlockIPs: true,
      hasWebhooks: true,
      hasWebsites: true,
      hasExport: true,
      hasAutoResponses: true,
      hasIntegrations: true,
      hasCustomEmailTemplates: false,
    },
    content: {
      title: "Hobby",
      description: "Get started with our launch plan.",
      features: [
        {
          text: "100 submissions",
        },
      ],
      action: {
        title: "Get Started",
        url: "https://forms.basestack.co/signup",
      },
    },
  },
  {
    id: PlanTypeId.SCALE,
    price: {
      monthly: {
        amount: 99,
        currency: "USD",
        id: "",
      },
      yearly: {
        amount: 79, // 20% off
        currency: "USD",
        id: "",
      },
    },
    limits: {
      forms: 100000000,
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
      hasNotifications: true,
      hasBlockIPs: true,
      hasWebhooks: true,
      hasWebsites: true,
      hasExport: true,
      hasAutoResponses: true,
      hasIntegrations: true,
      hasCustomEmailTemplates: true,
    },
    content: {
      title: "Hobby",
      description: "Get started with our SCALE plan.",
      features: [
        {
          text: "100 submissions",
        },
      ],
      action: {
        title: "Get Started",
        url: "https://forms.basestack.co/signup",
      },
    },
  },
];

const getFormPlan = (id: PlanTypeId): Plan => {
  const plan = forms.find((plan: Plan) => plan.id === id);
  if (!plan) {
    throw new Error(`Plan with ID ${id} not found.`);
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
  feature: keyof Plan["features"],
) => {
  const plan = getFormPlan(id);
  return plan.features[feature];
};

const getFormLimitByKey = (id: PlanTypeId, limit: keyof Plan["limits"]) => {
  const plan = getFormPlan(id);
  return plan?.limits[limit];
};

const isUnderFormPlanLimit = (
  id: PlanTypeId,
  limit: keyof Plan["limits"],
  value: number,
) => {
  const plan = getFormPlan(id);
  return plan?.limits[limit] >= value;
};



export const plans = {
  forms,
  getFormPlan,
  getFormPlanLimits,
  getFormPlanFeatures,
  hasFormPlanFeature,
  getFormLimitByKey,
  isUnderFormPlanLimit
};
