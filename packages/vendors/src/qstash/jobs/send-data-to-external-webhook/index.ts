// UpStash

import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/nextjs";
// Types
import type { SendDataToExternalWebhookPayload } from "../../types";

export interface SendDataToExternalWebHookJobArgs {
  onSuccess: (externalCustomerId?: string) => Promise<void>;
}

export const SendDataToExternalWebHookJob = ({
  onSuccess,
}: SendDataToExternalWebHookJobArgs) =>
  serve<SendDataToExternalWebhookPayload>(
    async (context) => {
      const { url, body, externalCustomerId } = context.requestPayload;

      console.info(
        `Job: External Webhook - Preparing to send data to external webhook: ${url}`,
      );

      await context.run("send-data-to-external-webhook-step", async () => {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        await onSuccess(externalCustomerId);

        console.info(
          `Job: External Webhook - Data sent to the external webhook with status: ${res.status}`,
        );
      });

      console.info(
        "Job: External Webhook - ✨ Data successfully sent to the external webhook ✨",
      );
    },
    {
      receiver: new Receiver({
        currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
        nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
      }),
      failureFunction: async ({
        context,
        failStatus,
        failResponse,
        failHeaders,
      }) => {
        console.error(
          `Job: External Webhook - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
        );
      },
    },
  );
