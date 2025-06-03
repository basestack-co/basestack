// Prisma
import { prisma } from "server/db";
// Vendors
import { qstash, polar } from "@basestack/vendors";
// Utils
import { withUsageUpdate } from "server/db/utils/subscription";
// Utils
import { Product, UsageEvent } from "@basestack/utils";

export const { POST } = qstash.jobs.CheckSpamJob({
  onRun: async (submissionId, userId, externalCustomerId) => {
    if (externalCustomerId) {
      await polar.createUsageEvent(UsageEvent.SPAM_CHECK, externalCustomerId, {
        product: Product.FORMS,
        submissionId,
        userId,
      });
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
