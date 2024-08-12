import { eventTrigger } from "@trigger.dev/sdk";
import { triggerClient, TriggerEventName } from "libs/trigger";
// Prisma
import prisma from "libs/prisma";
// AI
import { TextGenerationModel, cfAiClient, instructions } from "libs/cf/ai";
// Utils
import { z } from "zod";

triggerClient.defineJob({
  id: "check-data-for-spam",
  name: "Check data for spam",
  version: "1.0.0",
  trigger: eventTrigger({
    name: TriggerEventName.CHECK_DATA_FOR_SPAM,
    schema: z.object({
      submissionId: z.string(),
      data: z.any(),
    }),
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info(
      `Preparing to check data for spam: ${JSON.stringify(payload.data)} with submission ID: ${payload.submissionId}`,
    );

    await io.runTask(
      "check-data-for-spam",
      async () => {
        const res = await cfAiClient({
          model: TextGenerationModel.LLAMA_3_8B_INSTRUCT,
          messages: instructions.checkSpam(JSON.stringify(payload.data)),
        });

        if (res.success) {
          await io.logger.info(
            `Data successfully checked for: ${res.result.response}`,
          );

          const isSpam = JSON.parse(res.result.response).isSpam ?? false;

          if (isSpam) {
            await io.logger.info(
              `The data is spam. Submission ID: ${payload.submissionId}. Preparing to update the form Submission status on the DB.`,
            );

            await prisma.submission.update({
              where: {
                id: payload.submissionId,
              },
              data: {
                isSpam: true,
              },
            });
          }
        }
      },
      { name: "Check data for Spam" },
    );

    await io.logger.info("✨ Data successfully checked ✨");
  },
});
