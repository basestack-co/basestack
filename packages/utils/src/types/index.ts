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
  PREVIEW = "preview",
  FREE = "free",
  HOBBY = "hobby",
  LAUNCH = "launch",
  SCALE = "scale",
  ENTERPRISE = "enterprise",
}

export interface PlanVariantIds {
  local: number;
  development: number;
  production: number;
}

export interface PlanPriceInterval {
  amount: number;
  currency: string;
  variantIds: PlanVariantIds;
}

export interface PlanPrice {
  monthly: PlanPriceInterval;
  yearly: PlanPriceInterval;
}

export interface Plan {
  id: PlanTypeId;
  name: string;
  slogan: string;
  description: string;
  price: PlanPrice;
}

export interface FormPlan extends Plan {
  limits: {
    forms: number;
    submissions: number;
    teams: number;
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

export interface FlagsPlan extends Plan {
  limits: {
    projects: number;
    environments: number;
    flags: number;
    segments: number;
    rollouts: number;
    teams: number;
    members: number;
    apiRequests: number;
  };
  features: {
    hasHistory: boolean;
    hasRemoteConfig: boolean;
    hasPreviewFeatures: boolean;
    hasRollouts: boolean;
    hasTags: boolean;
    hasSegments: boolean;
    hasBlockIPs: boolean;
    hasWebsites: boolean;
  };
}

export type FlagsPermission =
  // Project Permissions
  | "view_project_flags"
  | "view_project_keys"
  | "view_project_environments"
  | "view_project_security"
  | "add_project_flags"
  | "add_project_member"
  | "add_project_environment"
  | "edit_project_flags"
  | "edit_project_name"
  | "edit_project_environment"
  | "delete_project_flags"
  | "delete_project_environment"
  | "delete_project";

export type FormsPermission =
  // Form Permissions
  | "view_form_submissions"
  | "view_form_security_settings"
  | "view_form_customization_settings"
  | "view_form_notifications_settings"
  | "view_form_setup_page"
  | "view_form_endpoint"
  | "view_form_id"
  | "view_form_submissions_actions"
  | "add_form_submissions"
  | "add_form_member"
  | "edit_form_submissions"
  | "edit_form_name"
  | "edit_form_security_websites"
  | "edit_form_security_ip_rules"
  | "edit_form_security_honey_pot"
  | "edit_form_customization_data_query_string"
  | "edit_form_customization_redirect_url"
  | "edit_form_customization_success_url"
  | "edit_form_customization_error_url"
  | "edit_form_notifications_emails"
  | "enable_form"
  | "enable_form_data_retention"
  | "enable_form_spam_protection"
  | "enable_form_webhook"
  | "delete_form_submissions"
  | "delete_form";
