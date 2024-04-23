// Types
import { Data } from "../FormSubmission/types";
import { Prisma } from "@prisma/client";

export const formatFormSubmissions = (data: Prisma.JsonValue): Data => {
  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  return Object.entries(data).map(([title, description]) => ({
    title,
    description,
  }));
};
