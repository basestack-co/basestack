export interface CheckDataForSpamPayload {
  submissionId: string;
  data: any;
}

export interface SendEmailPayload {
  to: string[];
  subject: string;
  template: string;
  props?: any;
}

export interface SendDataToExternalWebhookPayload {
  url: string;
  body: any;
}

export interface UpdateSubscriptionEventPayload {
  meta: {
    test_mode: boolean;
    webhook_id: string;
    event_name: string;
    custom_data: {
      plan_id: string;
      user_id: string;
      product: string;
      app_mode: string;
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
      variant_name: string;
    };
  };
}
