import { eventTrigger } from "@trigger.dev/sdk";
import { triggerClient, TriggerEventName } from "libs/trigger";
// Utils
import { z } from "zod";

triggerClient.defineJob({
  id: "send-data-to-external-webhook",
  name: "Send data to external webhook",
  version: "1.0.0",
  trigger: eventTrigger({
    name: TriggerEventName.SEND_DATA_TO_EXTERNAL_WEBHOOK,
    schema: z.object({
      url: z.string().url(),
      //headers: z.record(z.string()),
      body: z.any(),
    }),
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info(
      `Preparing to send data to external webhook: ${payload.url}`,
    );

    await io.runTask(
      "send-email",
      async () => {
        const res = await fetch(payload.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload.body),
        });

        await io.logger.info(
          `Data sent to the external webhook with status: ${res.status}`,
        );
      },
      { name: "Send data to the external webhook" },
    );

    await io.logger.info(
      "✨ Data successfully sent to the external webhook ✨",
    );
  },
});
