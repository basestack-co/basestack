import { z } from "zod";

export const AllEnvironmentInput = z
  .object({
    projectId: z.string(),
  })
  .required();

export const CreateEnvironmentInput = z
  .object({
    name: z.string(),
    description: z.string(),
    projectId: z.string(),
    copyFromEnvId: z.string(),
  })
  .required();

export const UpdateEnvironmentInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    environmentId: z.string().min(1),
    name: z.string(),
    description: z.string(),
  })
  .required();

export const DeleteEnvironmentInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    environmentId: z.string(),
  })
  .required();
