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

export const FlagBySlugInput = z
  .object({
    projectId: z.string(),
    slug: z.string(),
  })
  .required();

export const EnvironmentsInput = z.array(
  z.object({
    name: z.string(),
    id: z.string(),
    enabled: z.boolean(),
  })
);

export const flagDataInput = z.object({
  slug: z.string(),
  enabled: z.boolean(),
  payload: z.any().optional().nullable(),
  expiredAt: z.date().optional().nullable(),
  description: z.string().optional(),
});

export const CreateFlagInput = z.object({
  // this prop is used on the createProtectedRouter Middleware to validated user project permissions
  projectId: z.string(),
  environments: EnvironmentsInput,
  data: z.array(
    flagDataInput.extend({
      environmentId: z.string(),
    })
  ),
});

export const UpdateFlagInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    environments: EnvironmentsInput,
    data: z.array(
      flagDataInput.extend({
        id: z.string(),
      })
    ),
  })
  .required();

export const DeleteFlagInput = z
  .object({
    // this prop is used on the createProtectedRouter Middleware to validated user project permissions
    projectId: z.string(),
    flagSlug: z.string(),
  })
  .required();
