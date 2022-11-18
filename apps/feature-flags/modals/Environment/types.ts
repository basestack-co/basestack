import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "Must be 30 characters or less")
    .min(1, "Required field"),
  description: z
    .string()
    .max(250, "Must be 250 characters or less")
    .min(1, "Required field"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;
