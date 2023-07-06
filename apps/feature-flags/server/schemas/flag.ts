import { z } from "zod";
// utils
import { withProjectId, withEnvironment, withFlagData } from "./utils";

const environments = z.array(
  z.object({
    name: z.string(),
    id: z.string(),
    enabled: z.boolean(),
  }),
);

const data = z.object({
  slug: z.string(),
  enabled: z.boolean(),
  payload: z.any().optional().nullable(),
  expiredAt: z.date().optional().nullable(),
  description: z.string().optional(),
});

// Inputs

const all = withProjectId
  .extend({
    search: z.string().optional().nullable(),
    pagination: z
      .object({
        skip: z.number(),
        take: z.number(),
      })
      .nullable(),
  })
  .required();

export const bySlug = withProjectId
  .extend({
    slug: z.string(),
  })
  .required();

export const create = withProjectId
  .extend({
    environments: z.array(withEnvironment),
    data: z.array(
      withFlagData.extend({
        environmentId: z.string(),
      }),
    ),
  })
  .required();

export const update = withProjectId
  .extend({
    environments: z.array(withEnvironment),
    data: z.array(
      withFlagData.extend({
        id: z.string(),
      }),
    ),
  })
  .required();

export const deleteFlag = withProjectId
  .extend({
    flagSlug: z.string(),
  })
  .required();

const projectSchema = {
  input: {
    all,
    bySlug,
    update,
    create,
    delete: deleteFlag,
  },
};

export default projectSchema;
