// Client
import { client, baseUrl } from "../client";
// Types
import type {
  CheckDataForSpamPayload,
  SendEmailPayload,
  SendDataToExternalWebhookPayload,
} from "../types";

// AI JOBS

const aiQueue = client.queue({
  queueName: "ai-queue",
});

export const checkDataForSpamEvent = async (body: CheckDataForSpamPayload) => {
  await aiQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/check-spam`,
    retries: 2,
    contentBasedDeduplication: true,
    body,
  });
};

// NOTIFICATIONS JOBS

const notificationsQueue = client.queue({
  queueName: "notifications-queue",
});

export const sendEmailEvent = async (body: SendEmailPayload) => {
  await notificationsQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/send-email`,
    retries: 2,
    body,
  });
};

export const sendDataToExternalWebhookEvent = async (
  body: SendDataToExternalWebhookPayload,
) => {
  await notificationsQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/send-data-to-external-webhook`,
    retries: 2,
    body,
  });
};
