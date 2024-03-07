import { TriggerClient } from "@trigger.dev/sdk";

export enum TriggerEventName {
  SEND_EMAIL = "send.email.event",
}

export const triggerClient = new TriggerClient({
  id: process.env.TRIGGER_PROJECT_ID!,
  apiKey: process.env.TRIGGER_API_KEY,
  apiUrl: process.env.TRIGGER_API_URL,
});
