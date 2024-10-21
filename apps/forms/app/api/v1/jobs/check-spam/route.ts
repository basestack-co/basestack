// UpStash
import { serve } from "@upstash/qstash/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import type { CheckDataForSpamPayload } from "libs/qstash";
// AI
import { TextGenerationModel, cfAiClient, instructions } from "libs/cf/ai";
// Prisma
import prisma from "libs/prisma";

export const POST = serve<CheckDataForSpamPayload>(
  async (context) => {
    const { submissionId, data } = context.requestPayload;

    console.info(
      `Preparing to check data for spam: ${JSON.stringify(data)} with submission ID: ${submissionId}`,
    );

    await context.run("check-data-for-spam-step", async () => {
      const res = await cfAiClient({
        model: TextGenerationModel.LLAMA_3_8B_INSTRUCT,
        messages: instructions.checkSpam(JSON.stringify(data)),
      });

      if (res.success) {
        console.info(`Data successfully checked for: ${res.result.response}`);

        const isSpam = JSON.parse(res.result.response).isSpam ?? false;

        if (isSpam) {
          console.info(
            `The data is spam. Submission ID: ${submissionId}. Preparing to update the form Submission status on the DB.`,
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
    failureFunction: async (context, failStatus, failResponse, failHeaders) => {
      // Handle error, i.e. log to a log provider
    },
  },
);
