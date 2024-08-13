import { logger, task } from "@trigger.dev/sdk/v3";
// Prisma
import prisma from "libs/prisma";
// AI
import { cfAiClient, instructions, TextGenerationModel } from "libs/cf/ai";

export interface CheckForSpamPayload {
  submissionId: string;
  data: any;
}

export const checkDataForSpamTask = task({
  id: "check-data-for-spam",
  machine: {
    preset: "small-1x",
  },
  init: async (payload) => {
    logger.info(
      `Preparing to check data for spam: ${JSON.stringify(payload.data)} with submission ID: ${payload.submissionId}`,
    );
  },
  run: async (payload: CheckForSpamPayload) => {
    const res = await cfAiClient({
      model: TextGenerationModel.LLAMA_3_8B_INSTRUCT,
      messages: instructions.checkSpam(JSON.stringify(payload.data)),
    });

    if (res.success) {
      logger.info(`Data successfully checked for: ${res.result.response}`);

      const isSpam = JSON.parse(res.result.response).isSpam ?? false;

      if (isSpam) {
        logger.info(
          `The data is spam. Submission ID: ${payload.submissionId}. Preparing to update the form Submission status on the DB.`,
        );

        return prisma.submission.update({
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
  onSuccess: async () => {
    logger.info("✨ Data successfully checked ✨");
  },
});
