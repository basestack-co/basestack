import { z } from "zod";
// utils
import {
  withProjectId,
  withProjectIdAndUserId,
  withProjectSlug,
} from "./utils";

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

const members = withProjectId.required();

const addMember = withProjectIdAndUserId.required();

const removeMember = withProjectIdAndUserId.required();

const projectSchema = {
  input: {
    BySlug,
    create,
    update,
    delete: deleteInput,
    allKeys,
    members,
    addMember,
    removeMember,
  },
};

export default projectSchema;
