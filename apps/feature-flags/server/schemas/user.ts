import { z } from "zod";

export const UserByProjectIdInput = z
  .object({
    projectId: z.string(),
  })
  .required();

export const AllUserInput = z
  .object({
    projectId: z.string(),
  })
  .required();

export const UserBySearchInput = z
  .object({
    projectId: z.string(),
    search: z.string(),
  })
  .required();
