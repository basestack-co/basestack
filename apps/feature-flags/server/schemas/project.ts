import { z } from "zod";

export const ProjectBySlugInput = z
  .object({
    projectSlug: z.string(),
  })
  .required();

export const CreateProjectInput = z
  .object({
    name: z.string(),
    slug: z.string(),
  })
  .required();

export const UpdateProjectInput = z
  .object({
    projectId: z.string(),
    name: z.string(),
  })
  .required();

export const DeleteProjectInput = z
  .object({
    projectId: z.string(),
  })
  .required();
