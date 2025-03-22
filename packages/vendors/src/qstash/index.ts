// Events
import {
  checkDataForSpamEvent,
  sendDataToExternalWebhookEvent,
  sendEmailEvent,
} from "./events";
// Jobs
import { CheckSpamJob } from "./jobs/check-spam";
import { CheckSubscriptionJob } from "./jobs/check-subscription";
import { SendDataToExternalWebHookJob } from "./jobs/send-data-to-external-webhook";

const events = {
  checkDataForSpamEvent,
  sendDataToExternalWebhookEvent,
  sendEmailEvent,
};

const jobs = {
  CheckSpamJob,
  CheckSubscriptionJob,
  SendDataToExternalWebHookJob,
};

export { events, jobs };
