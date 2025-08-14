// Types
import { MonitorType } from ".prisma/client";
import { z } from "zod";
// Utils
import { methods } from "./utils";

export enum TabType {
  CORE = "core",
  ADVANCED = "advanced",
}

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(MonitorType),
  cron: z.string().min(1, "Cron is required"),
  config: z.object({
    url: z.string().url("Must be a valid URL"),
    method: z.enum(methods),
    expectedStatus: z.number().min(100).max(599),
    timeout: z.number().min(100).max(300_000),
    verifySSL: z.boolean().optional(),
    followRedirects: z.boolean().optional(),
    body: z.string().optional(),
    keyword: z.string().optional(),
    port: z.number().min(1).max(65535).optional(),
    sslCheckDays: z.number().min(1).max(365).optional(),
    regions: z.array(z.string()).optional(),
    retries: z.number().min(0).max(10).optional(),
    retryDelay: z.number().min(0).max(10000).optional(),
    maxResponseSize: z
      .number()
      .min(1024)
      .max(10 * 1024 * 1024)
      .optional(),
    headers: z.string().optional(),
  }),
});

export type MonitorFormInputs = z.TypeOf<typeof FormSchema>;
