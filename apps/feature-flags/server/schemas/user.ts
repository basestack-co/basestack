import { z } from "zod";
// utils
import { withProjectId, withProjectIdAndUserId } from "./utils";

const all = z
  .object({
    excludeProjectId: z.string(),
  })
  .required();

const bySearch = withProjectId
  .extend({
    search: z.string(),
  })
  .required();

const userSchema = {
  input: {
    all,
    bySearch,
  },
};

export default userSchema;
