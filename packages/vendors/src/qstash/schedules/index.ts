// Client
import { baseUrl, qstashClient } from "../client";
// Types
import type { CreateMonitorCheckSchedulePayload } from "../types";

export const createMonitorCheckSchedule = async (
  cron: string,
  body: CreateMonitorCheckSchedulePayload,
  timeout: number = 30000, // 30 seconds
  retries: number = 1
) => {
  const res = await qstashClient.schedules.create({
    destination: `${baseUrl}/api/v1/schedules/monitor-check`,
    body: JSON.stringify(body),
    timeout,
    cron,
    retries,
  });

  return res;
};
