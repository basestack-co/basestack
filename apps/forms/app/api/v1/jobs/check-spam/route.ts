// Prisma
import { prisma } from "server/db";
// Vendors
import { qstash, polar } from "@basestack/vendors";
// Utils
import { withUsageUpdate } from "server/db/utils/subscription";
// Utils
import { UsageEvent } from "@basestack/utils";

export const { POST } = qstash.jobs.CheckSpamJob({
  onRun: async (externalCustomerId) => {
    if (externalCustomerId) {
      await polar.createUsageEvent(UsageEvent.SPAM_CHECK, externalCustomerId);
    }
  },
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
