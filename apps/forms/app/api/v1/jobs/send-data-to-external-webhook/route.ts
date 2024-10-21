// UpStash
import { serve } from "@upstash/qstash/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { SendDataToExternalWebhookPayload } from "libs/qstash";

export const POST = serve<SendDataToExternalWebhookPayload>(
  async (context) => {
    const { url, body } = context.requestPayload;

    console.info(`Preparing to send data to external webhook: ${url}`);

    await context.run("send-data-to-external-webhook-step", async () => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.info(
        `Data sent to the external webhook with status: ${res.status}`,
      );
    });

    console.info("✨ Data successfully sent to the external webhook ✨");
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
  },
);
