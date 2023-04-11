import { z } from "zod";

export const withProjectId = z.object({
  // this prop is used on the createProtectedRouter Middleware to validated user project permissions
  projectId: z.string(),
});

export const withProjectSlug = z.object({
  projectSlug: z.string(),
});

export const withProjectIdAndUserId = withProjectId.extend({
  userId: z.string(),
});

export const withEnvironment = z.object({
  name: z.string(),
  id: z.string(),
  enabled: z.boolean(),
});

export const withFlagData = z.object({
  slug: z.string(),
  enabled: z.boolean(),
  payload: z.any().optional().nullable(),
  expiredAt: z.date().optional().nullable(),
  description: z.string().optional(),
});
