// Client
import { Client as QstashClient } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";

export const qstashClient = new QstashClient({
  token: process.env.QSTASH_TOKEN ?? "dummy-token-for-development",
});

export const workflowClient = new WorkflowClient({
  token: process.env.QSTASH_TOKEN ?? "dummy-token-for-development",
});

export const baseUrl = process.env.UPSTASH_WORKFLOW_URL;
