export interface UsagePayload {
  externalCustomerId?: string;
}

export interface CheckDataForSpamPayload extends UsagePayload {
  userId: string;
  submissionId: string;
  data: any;
}

export interface SendEmailPayload extends UsagePayload {
  to: string[];
  subject: string;
  template: string;
  props?: any;
}

export interface SendDataToExternalWebhookPayload extends UsagePayload {
  url: string;
  body: any;
}

export interface SchedulePayload {
  timeout: number;
  retries: number;
  cron: string;
}

export interface CreateMonitorCheckSchedulePayload extends UsagePayload {
  projectId: string;
  monitorId: string;
  adminUserEmail: string;
}

export interface CreateMonitorCheckScheduleArgs extends SchedulePayload {
  body: CreateMonitorCheckSchedulePayload;
}
