// Prisma
import { prisma } from "server/db";
// Vendors
import { qstash } from "@basestack/vendors";

export const { POST } = qstash.jobs.CheckSpamJob({
  onSuccess: async (submissionId) => {
    await prisma.submission.update({
      where: {
        id: submissionId,
      },
      data: {
        isSpam: true,
      },
    });
  },
});
