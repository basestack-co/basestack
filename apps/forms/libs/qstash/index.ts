import { Client } from "@upstash/qstash";

export const client = new Client({ token: process.env.QSTASH_TOKEN! });
export const baseUrl = process.env.UPSTASH_WORKFLOW_URL;

// AI JOBS

const aiQueue = client.queue({
  queueName: "ai-queue",
});

export interface CheckDataForSpamPayload {
  submissionId: string;
  data: any;
}

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

export interface SendEmailPayload {
  to: string[];
  subject: string;
  template: string;
  props?: any;
}

export const sendEmailEvent = async (body: SendEmailPayload) => {
  await notificationsQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/send-email`,
    retries: 2,
    body,
  });
};

export interface SendDataToExternalWebhookPayload {
  url: string;
  body: any;
}

export const sendDataToExternalWebhookEvent = async (
  body: SendDataToExternalWebhookPayload,
) => {
  await notificationsQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/send-data-to-external-webhook`,
    retries: 2,
    body,
  });
};

// SUBSCRIPTION JOBS

const subscriptionsQueue = client.queue({
  queueName: "subscriptions-queue",
});

export interface UpdateSubscriptionEventPayload {
  meta: {
    test_mode: boolean;
    webhook_id: string;
    event_name: string;
    custom_data: {
      plan_id: string;
      user_id: string;
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      customer_id: number;
      status: string;
      ends_at: string;
      renews_at: string;
      product_id: number;
      cancelled: boolean;
      order_id: number;
      paused: boolean;
      variant_id: number;
    };
  };
}

export const updateSubscriptionEvent = async (
  body: UpdateSubscriptionEventPayload,
) => {
  await subscriptionsQueue.enqueueJSON({
    url: `${baseUrl}/api/v1/jobs/update-subscription`,
    retries: 2,
    body,
  });
};
