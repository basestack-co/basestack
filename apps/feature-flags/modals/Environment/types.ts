import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "environment.input.name.error.max")
    .min(1, "environment.input.name.error.min"),
  description: z
    .string()
    .max(250, "environment.input.description.error.max")
    .min(1, "environment.input.description.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;
