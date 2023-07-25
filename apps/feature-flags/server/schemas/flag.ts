import { z } from "zod";
// utils
import { withProjectId, withEnvironment, withFlagData } from "./utils";

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

const total = withProjectId.required();

const environments = withProjectId
  .extend({
    slug: z.string(),
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
    total,
    environments,
    bySlug,
    update,
    create,
    delete: deleteFlag,
  },
};

export default projectSchema;
