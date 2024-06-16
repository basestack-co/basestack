// Plans Configs
import { config as formsConfig } from "./forms";

const getSubscriptionEvents = [
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_resumed",
  "subscription_expired",
  "subscription_paused",
  "subscription_unpaused",
  "subscription_payment_failed",
  "subscription_payment_success",
  "subscription_payment_recovered",
  "subscription_payment_refunded",
  "subscription_plan_changed",
];

export const plans = {
  getSubscriptionEvents,
  ...formsConfig,
};
