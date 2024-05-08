import { TriggerClient } from "@trigger.dev/sdk";

export enum TriggerEventName {
  SEND_EMAIL = "send.email.event",
  SEND_DATA_TO_EXTERNAL_WEBHOOK = "send.data.to.external.webhook.event",
  CHECK_DATA_FOR_SPAM = "check.data.spam.event",
  UPDATE_SUBSCRIPTION = "update.subscription.event",
  CHECK_SUBSCRIPTION = "check.subscription.event",
}

export const triggerClient = new TriggerClient({
  id: process.env.TRIGGER_PROJECT_ID!,
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
