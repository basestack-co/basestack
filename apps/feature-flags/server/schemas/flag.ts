import { z } from "zod";

export const AllFlagsInput = z
  .object({
    projectId: z.string(),
    search: z.string().optional().nullable(),
    pagination: z
      .object({
        skip: z.number(),
        take: z.number(),
      })
      .nullable(),
  })
  .required();

export const FlagByIdInput = z
  .object({
    projectId: z.string(),
    flagId: z.string(),
  })
  .required();

export const CreateFlagInput = z.object({
  // this prop is used on the createProtectedRouter Middleware to validated user project permissions
  projectId: z.string(),
  data: z.array(
    z.object({
      environmentId: z.string(),
      slug: z.string(),
      enabled: z.boolean(),
      payload: z.any().optional().nullable(),
      expiredAt: z.date().optional().nullable(),
      description: z.string().optional(),
    })
  ),
});

export const UpdateFlagInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    flagId: z.string(),
    enabled: z.boolean(),
    payload: z.any().optional(),
    expiredAt: z.date().nullable(),
    description: z.string().nullable(),
  })
  .required();

export const DeleteFlagInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    flagId: z.string(),
  })
  .required();
