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
// Schedules
import {
  createMonitorCheckSchedule,
  deleteSchedule,
  getSchedule,
  pauseSchedule,
  resumeSchedule,
} from "./schedules";

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

const schedules = {
  createMonitorCheckSchedule,
  deleteSchedule,
  pauseSchedule,
  resumeSchedule,
  getSchedule,
};

export { events, jobs, schedules };
