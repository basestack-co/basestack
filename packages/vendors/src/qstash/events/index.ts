// Client
import { baseUrl, workflowClient } from "../client";
// Types
import type {
  CheckDataForSpamPayload,
  SendDataToExternalWebhookPayload,
  SendEmailPayload,
} from "../types";

// AI JOBS

/* const aiQueue = client.queue({
  queueName: "ai-queue",
}); */

export const checkDataForSpamEvent = async (body: CheckDataForSpamPayload) => {
  await workflowClient.trigger({
    url: `${baseUrl}/api/v1/jobs/check-spam`,
    retries: 2,
    body,
  });
};

// NOTIFICATIONS JOBS

/* const notificationsQueue = client.queue({
  queueName: "notifications-queue",
}); */

//  await notificationsQueue.enqueueJSON({

export const sendEmailEvent = async (body: SendEmailPayload) => {
  await workflowClient.trigger({
    url: `${baseUrl}/api/v1/jobs/send-email`,
    retries: 2,
    body,
  });
};

export const sendDataToExternalWebhookEvent = async (
  body: SendDataToExternalWebhookPayload,
) => {
  await workflowClient.trigger({
    url: `${baseUrl}/api/v1/jobs/send-data-to-external-webhook`,
    retries: 2,
    body,
  });
};
