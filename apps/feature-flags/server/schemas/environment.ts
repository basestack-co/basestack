import { z } from "zod";
// utils
import { withProjectId } from "./utils";

const all = withProjectId.required();

export const create = withProjectId
  .extend({
    name: z.string(),
    description: z.string(),
    copyFromEnvId: z.string(),
  })
  .required();

export const update = withProjectId
  .extend({
    environmentId: z.string().min(1),
    name: z.string(),
    description: z.string(),
  })
  .required();

export const deleteInput = withProjectId
  .extend({
    environmentId: z.string(),
  })
  .required();

const environmentSchema = {
  input: {
    all,
    create,
    update,
    delete: deleteInput,
  },
};

export default environmentSchema;
