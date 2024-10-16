import { task, logger } from "@trigger.dev/sdk/v3";

export interface SendToWebHookPayload {
  url: string;
  body: any;
}

export const sendToWebHookTask = task({
  id: "send-data-to-external-webhook",
  machine: {
    preset: "small-1x",
  },
  init: async (payload) => {
    logger.info(`Preparing to send data to external webhook: ${payload.url}`);
  },
  run: async (payload: SendToWebHookPayload) => {
    const res = await fetch(payload.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.body),
    });

    logger.info(`Data sent to the external webhook with status: ${res.status}`);

    return res;
  },
  onSuccess: async () => {
    logger.info("✨ Data successfully sent to the external webhook ✨");
  },
});
