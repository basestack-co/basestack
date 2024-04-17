import { Client } from "@upstash/qstash";
// Utils
import { getBrowserUrl } from "@basestack/utils";

export const jobsBaseUrl = `${getBrowserUrl()}/api`;

export const qstashClient = new Client({
  token: process.env.QSTASH_TOKEN!,
});

export const schedules = qstashClient.schedules;
