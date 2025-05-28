// Client
import { Client } from "@upstash/workflow";

export const client = new Client({
  token: process.env.QSTASH_TOKEN ?? "dummy-token-for-development",
});

export const baseUrl = process.env.UPSTASH_WORKFLOW_URL;
