// Types

import type { Prisma } from ".prisma/client";
import type { Data } from "../FormSubmission/types";

export const formatFormSubmissions = (data: Prisma.JsonValue): Data => {
  if (!data || Object.keys(data).length === 0) {
    return [];
  }

  const entries = Object.entries(data);
  const sortedEntries = entries.sort(([titleA], [titleB]) => {
    if (titleA.toLowerCase().includes("email")) return -1;
    if (titleB.toLowerCase().includes("email")) return 1;
    return 0;
  });

  return sortedEntries.map(([title, description]) => ({
    title,
    description: description ? description.toString() : "",
  }));
};

export interface Submission {
  id: string;
  formId: string;
  isSpam: boolean | null;
  viewed: boolean | null;
  isVisible: boolean | null;
  data: Prisma.JsonValue;
  metadata: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

export const getSearchFilterKeys = (
  submissions: Submission[],
): { text: string }[] => {
  const keysMap: Map<string, boolean> = new Map();
  const requiredKeys: { text: string }[] = [];

  for (const submission of submissions) {
    if (submission.data) {
      const dataKeys = Object.keys(submission.data);
      for (const key of dataKeys) {
        if (!keysMap.has(key)) {
          keysMap.set(key, true);
          requiredKeys.push({ text: key });
        }
      }

      if (requiredKeys.length >= 3) break;
    }
  }

  return requiredKeys;
};
