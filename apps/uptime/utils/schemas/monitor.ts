import { timezones } from "utils/helpers/general";
import { z } from "zod";

export const MonitorConfigSchema = z.object({
  url: z.string().url(),
  cron: z
    .string()
    .min(1)
    .regex(/^(\S+\s+){4}\S+$/, "Invalid cron format"),
  timezone: z.enum(timezones as [string, ...string[]]),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]),
  headers: z.record(z.string(), z.string()),
  timeout: z.number().min(100).max(300_000), // milliseconds
  expectedStatus: z.number().min(100).max(599),
  body: z.string().optional(),
  keyword: z.string().optional(),
  port: z.number().min(1).max(65535).optional(),
  sslCheckDays: z.number().min(1).max(365).optional(),
  followRedirects: z.boolean().optional(),
  verifySSL: z.boolean().optional(),
  regions: z.array(z.string()).optional(),
  retries: z.number().min(0).max(10).optional(),
  retryDelay: z.number().min(0).max(10000).optional(),
  maxResponseSize: z
    .number()
    .min(1024)
    .max(10 * 1024 * 1024)
    .optional(),
});

export type MonitorConfig = z.infer<typeof MonitorConfigSchema>;
