import { Client } from "@upstash/qstash";

export const jobsBaseUrl = `${process.env.QSTASH_JOBS_API_URL}`;

export const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export const schedules = qstashClient.schedules;
