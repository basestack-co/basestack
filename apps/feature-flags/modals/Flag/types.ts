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
    .max(150, "flag.tab.core.input.name.error.max")
    .min(1, "flag.tab.core.input.name.error.min"),
  description: z
    .string()
    .max(150, "flag.tab.core.input.description.error.max")
    .optional(),
  environments: z.array(EnvironmentSchema),
});

export type FlagFormInputs = z.TypeOf<typeof FlagFormSchema>;
export type EnvironmentInput = z.TypeOf<typeof EnvironmentSchema>;
