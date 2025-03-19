// Events
import {
  checkDataForSpamEvent,
  sendDataToExternalWebhookEvent,
  sendEmailEvent,
  updateSubscriptionEvent,
} from "./events";
// Jobs
import { CheckSpamJob } from "./jobs/check-spam";
import { CheckSubscriptionJob } from "./jobs/check-subscription";
import { SendDataToExternalWebHookJob } from "./jobs/send-data-to-external-webhook";
import { UpdateSubscriptionJob } from "./jobs/update-subscription";

const events = {
  checkDataForSpamEvent,
  sendDataToExternalWebhookEvent,
  sendEmailEvent,
  updateSubscriptionEvent,
};

const jobs = {
  CheckSpamJob,
  CheckSubscriptionJob,
  SendDataToExternalWebHookJob,
  UpdateSubscriptionJob,
};

export { events, jobs };
