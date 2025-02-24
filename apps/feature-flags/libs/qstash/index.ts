import { Client } from "@upstash/qstash";

export const client = new Client({ token: process.env.QSTASH_TOKEN! });
export const baseUrl = process.env.UPSTASH_WORKFLOW_URL;

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
