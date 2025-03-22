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
