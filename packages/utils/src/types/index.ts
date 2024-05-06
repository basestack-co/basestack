/*
 *
 *  UTILS
 *
 * */

export type RemoveNullAndUndefined<T> = T extends null | undefined
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: RemoveNullAndUndefined<T[K]>;
      }
    : T;

export enum PlanTypeId {
  FREE = "free",
  HOBBY = "hobby",
  LAUNCH = "launch",
  SCALE = "scale",
}

export interface Plan {
  id: PlanTypeId;
  price: {
    monthly: {
      amount: number;
      currency: string;
      id: string;
    };
    yearly: {
      amount: number;
      currency: string;
      id: string;
    };
  };
  limits: {
    forms: number;
    submissions: number;
    members: number;
    spams: number;
    fileUploadLimit: number;
    integrationsCalls: number;
  };
  features: {
    hasFileUploads: boolean;
    hasDataQueryString: boolean;
    hasCustomUrls: boolean;
    hasRules: boolean;
    hasEmailNotifications: boolean;
    hasBlockIPs: boolean;
    hasWebhooks: boolean;
    hasWebsites: boolean;
    hasCustomExport: boolean;
    hasAutoResponses: boolean;
    hasIntegrations: boolean;
    hasCustomEmailTemplates: boolean;
    hasSpamProtection: boolean;
  };
  content: {
    title: string;
    description: string;
    features: {
      text: string;
    }[];
    action: {
      title: string;
      url: string;
    };
  };
}
