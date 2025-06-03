// Vendors
import { polar, qstash } from "@basestack/vendors";
// Utils
import { Product, UsageEvent } from "@basestack/utils";

export const { POST } = qstash.jobs.SendDataToExternalWebHookJob({
  onSuccess: async (externalCustomerId) => {
    if (externalCustomerId) {
      await polar.createUsageEvent(
        UsageEvent.WEBHOOK_TRIGGERED,
        externalCustomerId,
        {
          product: Product.FORMS,
        },
      );
    }
  },
});
