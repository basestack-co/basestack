// Client

import type { Schedule } from "@upstash/qstash";
import { baseUrl, qstashClient } from "../client";
// Types
import type { CreateMonitorCheckScheduleArgs } from "../types";

export const getSchedule = async (scheduleId: string): Promise<Schedule> => {
  return qstashClient.schedules.get(scheduleId);
};

export const deleteSchedule = async (scheduleId: string): Promise<void> => {
  return qstashClient.schedules.delete(scheduleId);
};

export const pauseSchedule = async (scheduleId: string): Promise<void> => {
  return qstashClient.schedules.pause({
    schedule: scheduleId,
  });
};

export const resumeSchedule = async (scheduleId: string): Promise<void> => {
  return qstashClient.schedules.resume({
    schedule: scheduleId,
  });
};

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
