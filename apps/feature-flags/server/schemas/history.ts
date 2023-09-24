import { z } from "zod";
import { withProjectId } from "./utils";

export const all = withProjectId
  .extend({
    flagId: z.string().optional().nullable(),
    search: z.string().optional().nullable(),
    range: z.array(z.date()).optional().nullable(),
  })
  .required();

export const create = withProjectId
  .extend({
    action: z.string(),
    payload: z.object({}),
  })
  .required();

const historySchema = {
  input: {
    all,
    create,
  },
};

export default historySchema;
