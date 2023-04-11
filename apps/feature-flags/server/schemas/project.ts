import { z } from "zod";
// utils
import { withProjectId, withProjectSlug } from "./utils";

const BySlug = z
  .object({
    projectSlug: z.string(),
  })
  .required();

const create = z
  .object({
    name: z.string(),
    slug: z.string(),
  })
  .required();

export const update = withProjectId
  .extend({
    name: z.string(),
  })
  .required();

const deleteInput = withProjectId.required();

const allKeys = withProjectSlug.required();

const projectSchema = {
  input: {
    BySlug,
    create,
    update,
    delete: deleteInput,
    allKeys,
  },
};

export default projectSchema;
