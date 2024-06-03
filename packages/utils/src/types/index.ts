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

export enum Product {
  FORMS = "forms",
  FLAGS = "flags",
}

export type AppEnv = "development" | "production" | "staging" | "local";

export enum SubscriptionEvent {
  SUBSCRIPTION_CREATED = "subscription_created",
  SUBSCRIPTION_UPDATED = "subscription_updated",
  SUBSCRIPTION_CANCELLED = "subscription_cancelled",
  SUBSCRIPTION_RESUMED = "subscription_resumed",
  SUBSCRIPTION_EXPIRED = "subscription_expired",
  SUBSCRIPTION_PAUSED = "subscription_paused",
  SUBSCRIPTION_UNPAUSED = "subscription_unpaused",
  SUBSCRIPTION_PAYMENT_FAILED = "subscription_payment_failed",
  SUBSCRIPTION_PAYMENT_SUCCESS = "subscription_payment_success",
  SUBSCRIPTION_PAYMENT_RECOVERED = "subscription_payment_recovered",
  SUBSCRIPTION_PAYMENT_REFUNDED = "subscription_payment_refunded",
  SUBSCRIPTION_PLAN_CHANGED = "subscription_plan_changed",
}

export enum PlanTypeId {
  FREE = "free",
  HOBBY = "hobby",
  LAUNCH = "launch",
  SCALE = "scale",
}

export interface Plan {
  id: PlanTypeId;
  name: string,
  price: {
    monthly: {
      amount: number;
      currency: string;
      variantId: number;
    };
    yearly: {
      amount: number;
      currency: string;
      variantId: number;
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
}
