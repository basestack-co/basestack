import { z } from "zod";

export const FormSchema = z.object({
  name: z
    .string()
    .max(30, "modal.environment.input.name.error.max")
    .min(1, "modal.environment.input.name.error.min"),
  description: z
    .string()
    .max(250, "modal.environment.input.description.error.max")
    .min(1, "modal.environment.input.description.error.min"),
});

export type FormInputs = z.TypeOf<typeof FormSchema>;
