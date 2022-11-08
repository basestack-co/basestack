import { z } from "zod";

export type SelectedView = "cards" | "table";

export enum TabType {
  CORE = "core",
  ADVANCED = "advanced",
  HISTORY = "history",
}

/*
FORM TYPES
 */

export const EnvironmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
});

export const FlagFormSchema = z.object({
  name: z
    .string()
    .max(150, "Must be 150 characters or less")
    .min(1, "Required field"),
  description: z.string().max(150, "Must be 120 characters or less").optional(),
  environments: z.array(EnvironmentSchema),
});

export type FlagFormInputs = z.TypeOf<typeof FlagFormSchema>;
export type EnvironmentInput = z.TypeOf<typeof EnvironmentSchema>;
