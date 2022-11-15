import { z } from "zod";

export const AllHistoryInput = z
  .object({
    projectId: z.string(),
    flagId: z.string().optional(),
  })
  .required();

export const CreateHistoryInput = z
  .object({
    projectId: z.string(),
    action: z.string(),
    payload: z.any(),
  })
  .required();
