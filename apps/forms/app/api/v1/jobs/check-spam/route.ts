// UpStash
import { serve } from "@upstash/workflow/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { CheckDataForSpamPayload } from "libs/qstash";
// AI
import { TextGenerationModel, cfAiClient, instructions } from "libs/cf/ai";
// Prisma
import prisma from "libs/prisma";

export const { POST } = serve<CheckDataForSpamPayload>(
  async (context) => {
    const { submissionId, data } = context.requestPayload;

    console.info(
      `Job: Check Spam - Preparing to check data for spam: ${JSON.stringify(data)} with submission ID: ${submissionId}`,
    );

    await context.run("check-data-for-spam-step", async () => {
      const res = await cfAiClient({
        model: TextGenerationModel.LLAMA_3_8B_INSTRUCT,
        messages: instructions.checkSpam(JSON.stringify(data)),
      });

      if (res.success) {
        console.info(
          `Job: Check Spam - Data successfully checked for: ${res.result.response}`,
        );

        const isSpam = JSON.parse(res.result.response).isSpam ?? false;

        if (isSpam) {
          console.info(
            `Job: Check Spam - The data is spam. Submission ID: ${submissionId}. Preparing to update the form Submission status on the DB.`,
          );

          await prisma.submission.update({
            where: {
              id: submissionId,
            },
            data: {
              isSpam: true,
            },
          });
        }
      }
    });
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
        `Job: Check Spam - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
      );
    },
  },
);
