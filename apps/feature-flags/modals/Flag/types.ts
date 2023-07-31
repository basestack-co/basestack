import { z } from "zod";

export const EnvironmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  payload: z.any().optional(),
  expiredAt: z.date().nullish().optional(),
  flagId: z.string().nullish().optional(),
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
