import { z } from "zod";

export const UserByProjectIdInput = z
  .object({
    projectId: z.string(),
  })
  .required();

export const AllUserInput = z
  .object({
    excludeProjectId: z.string(),
  })
  .required();

export const UserBySearchInput = z
  .object({
    projectId: z.string(),
    search: z.string(),
  })
  .required();

export const AddUserToProjectInput = z
  .object({
    projectId: z.string(),
    userId: z.string(),
  })
  .required();

export const RemoveUserFromProjectInput = z
  .object({
    projectId: z.string(),
    userId: z.string(),
  })
  .required();
