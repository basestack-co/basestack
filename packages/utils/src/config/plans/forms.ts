// Types
import { PlanTypeId, FormPlan, FormsPermission } from "../../types";

const forms: FormPlan[] = [
  {
    id: PlanTypeId.FREE,
    name: "Free",
    slogan: "Perfect for testing out our platform.",
    description:
      "Perfect for testing out our platform. Create 1 form and collect up to 50 submissions for free. Includes basic email notifications but does not support file uploads, webhooks, or integrations. Great for personal projects and quick experiments.",
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
      forms: 1,
      submissions: 50,
      teams: 0,
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
    slogan: "Ideal for solo developers and small projects.",
    description:
      "Ideal for solo developers and small projects. Create up to 5 forms with 1,000 submissions per month. Includes custom URLs, webhooks, and spam protection to keep your forms clean. Also supports basic integrations and allows up to 3 team members.",
    price: {
      monthly: {
        amount: 9,
        currency: "USD",
        variantIds: {
          local: 368586,
          development: 368586,
          production: 716252,
        },
      },
      yearly: {
        amount: 7.67, // 15% off
        currency: "USD",
        variantIds: {
          local: 368587,
          development: 368587,
          production: 716253,
        },
      },
    },
    limits: {
      forms: 5,
      submissions: 1000,
      teams: 1,
      members: 3,
      spams: 1000,
      fileUploadLimit: 1, // GB
      integrationsCalls: 100,
    },
    features: {
      hasFileUploads: false,
      hasDataQueryString: false,
      hasCustomUrls: true,
      hasRules: false,
      hasEmailNotifications: true,
      hasBlockIPs: true,
      hasWebhooks: true,
      hasWebsites: true,
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
    slogan: "Designed for growing teams and startups.",
    description:
      "Designed for growing teams and startups. Create unlimited forms with up to 10,000 submissions per month. Gain access to file uploads (3GB limit), advanced integrations, webhooks, auto-responses, spam protection, and custom email templates. Supports up to 10 team members for seamless collaboration.",
    price: {
      monthly: {
        amount: 39,
        currency: "USD",
        variantIds: {
          local: 368595,
          development: 368595,
          production: 716255,
        },
      },
      yearly: {
        amount: 33.17, // 15% off
        currency: "USD",
        variantIds: {
          local: 368596,
          development: 368596,
          production: 716256,
        },
      },
    },
    limits: {
      forms: Infinity,
      submissions: 10000,
      teams: 2,
      members: 10,
      spams: 10000,
      fileUploadLimit: 3, // GB
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
      hasCustomEmailTemplates: true,
      hasSpamProtection: true,
    },
  },
  {
    id: PlanTypeId.SCALE,
    name: "Scale",
    slogan: "The ultimate plan for businesses handling high traffic.",
    description:
      "The ultimate plan for businesses handling high traffic. Get unlimited forms and submissions, 10GB of file uploads, and priority access to all features including advanced integrations, webhooks, IP blocking, custom exports, and premium automation rules. Supports up to 20 team members and is built for scale.",
    price: {
      monthly: {
        amount: 99,
        currency: "USD",
        variantIds: {
          local: 368599,
          development: 368599,
          production: 716258,
        },
      },
      yearly: {
        amount: 84.08, // 15% off
        currency: "USD",
        variantIds: {
          local: 368600,
          development: 368600,
          production: 716259,
        },
      },
    },
    limits: {
      forms: Infinity,
      submissions: Infinity,
      teams: 4,
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

const formsPermissions: Record<string, FormsPermission[]> = {
  ADMIN: [
    "view_form_submissions",
    "view_form_security_settings",
    "view_form_customization_settings",
    "view_form_notifications_settings",
    "view_form_endpoint",
    "view_form_id",
    "view_form_setup_page",
    "view_form_submissions_actions",
    "add_form_submissions",
    "add_form_member",
    "edit_form_submissions",
    "edit_form_name",
    "edit_form_security_websites",
    "edit_form_security_ip_rules",
    "edit_form_security_honey_pot",
    "edit_form_customization_data_query_string",
    "edit_form_customization_redirect_url",
    "edit_form_customization_success_url",
    "edit_form_customization_error_url",
    "edit_form_notifications_emails",
    "enable_form",
    "enable_form_data_retention",
    "enable_form_spam_protection",
    "enable_form_webhook",
    "delete_form_submissions",
    "delete_form",
  ],
  DEVELOPER: [
    "view_form_submissions",
    "view_form_security_settings",
    "view_form_customization_settings",
    "view_form_notifications_settings",
    "view_form_endpoint",
    "view_form_id",
    "view_form_setup_page",
    "view_form_submissions_actions",
    "enable_form",
    "enable_form_data_retention",
    "enable_form_spam_protection",
    "enable_form_webhook",
    "add_form_submissions",
    "edit_form_submissions",
    "edit_form_security_websites",
    "edit_form_security_ip_rules",
    "edit_form_security_honey_pot",
    "edit_form_customization_data_query_string",
    "edit_form_customization_redirect_url",
    "edit_form_customization_success_url",
    "edit_form_customization_error_url",
    "edit_form_notifications_emails",
  ],
  TESTER: [
    "view_form_submissions",
    "view_form_endpoint",
    "view_form_id",
    "view_form_setup_page",
    "view_form_submissions_actions",
    "add_form_submissions",
    "edit_form_submissions",
  ],
  VIEWER: ["view_form_submissions"],
};

const hasFormsPermission = (
  role: string | undefined,
  permission: FormsPermission,
): boolean => {
  return formsPermissions[role ?? "VIEWER"]?.includes(permission) ?? false;
};

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
  formsPermissions,
  getFormPlanLimitsDefaults,
  hasFormsPermission,
};
