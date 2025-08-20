// Types
import { MonitorType } from ".prisma/client";
import { z } from "zod";
// Schemas
import { MonitorConfigSchema } from "utils/schemas/monitor";

export enum TabType {
  CORE = "core",
  ADVANCED = "advanced",
}

export const IntervalSchema = z.union([
  z.string().min(1, "Check interval is required"),
  z.object({
    value: z.string().min(1, "Check interval is required"),
    label: z.string().optional(),
  }),
]);

export const FormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  type: z.nativeEnum(MonitorType),
  interval: IntervalSchema,
  config: MonitorConfigSchema,
});

export type MonitorFormInputs = z.TypeOf<typeof FormSchema>;
