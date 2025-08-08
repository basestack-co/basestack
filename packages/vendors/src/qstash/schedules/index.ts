// Client
import { baseUrl, qstashClient } from "../client";
// Types
import type { CreateMonitorCheckScheduleArgs } from "../types";

export const createMonitorCheckSchedule = async ({
  cron,
  body,
  timeout = 30000, // 30 seconds
  retries = 1,
}: CreateMonitorCheckScheduleArgs) => {
  const res = await qstashClient.schedules.create({
    destination: `${baseUrl}/api/v1/schedules/monitor-check`,
    body: JSON.stringify(body),
    timeout,
    cron,
    retries,
  });

  return res;
};
