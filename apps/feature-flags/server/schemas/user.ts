import { z } from "zod";
// utils
import { withProjectId, withProjectIdAndUserId } from "./utils";

const byProjectId = withProjectId.required();

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

const addUserToProject = withProjectIdAndUserId.required();

const removeUserFromProject = withProjectIdAndUserId.required();

const userSchema = {
  input: {
    all,
    byProjectId,
    bySearch,
    addUserToProject,
    removeUserFromProject,
  },
};

export default userSchema;
