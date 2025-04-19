// Prisma
import { prisma } from "server/db";
// Vendors
import { qstash } from "@basestack/vendors";
// Utils
import { withUsageUpdate } from "server/db/utils/subscription";

export const { POST } = qstash.jobs.CheckSpamJob({
  onSuccess: async (submissionId, userId) => {
    await prisma.$transaction(async (tx) => {
      await tx.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          isSpam: true,
        },
      });

      await withUsageUpdate(tx, userId, "spams", "increment");
    });
  },
});
