// Email
import {
  AddProjectMemberEmailTemplate,
  InviteEmailTemplate,
  NewSubmissionEmailTemplate,
  sendEmail,
  WelcomeEmailTemplate,
} from "@basestack/emails";
import { Product, UsageEvent } from "@basestack/utils";
// Vendors
import {
  ai,
  type CheckDataForSpamPayload,
  polar,
  type SendDataToExternalWebhookPayload,
  type SendEmailPayload,
} from "@basestack/vendors";
import { render } from "@react-email/render";
// UpStash Workflow
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import type { ElementType } from "react";
// Prisma
import { prisma } from "server/db";
import { withUsageUpdate } from "server/db/utils/subscription";

const templateList: { [key: string]: ElementType } = {
  "new-submission": NewSubmissionEmailTemplate,
  welcome: WelcomeEmailTemplate,
  invite: InviteEmailTemplate,
  addFormMember: AddProjectMemberEmailTemplate,
};

const jobsRoutes = new Hono()
  .post(
    "/send-email",
    serve<SendEmailPayload>(
      async (context) => {
        const { to, subject, template, externalCustomerId, props } =
          context.requestPayload;

        console.info(
          `Job: Basestack Forms - Send Email - Preparing to send email to ${to} with subject: ${subject}`,
        );
        console.info(
          `Job: Basestack Forms - Send Email - Email with the template ${template} with props: ${JSON.stringify(props)}`,
        );

        await context.run("send-email-step", async () => {
          const EmailTemplate = templateList[template];

          await Promise.all(
            to.map(async (email) => {
              const html = await render(<EmailTemplate {...props} />);

              await sendEmail({
                html,
                options: {
                  subject,
                  from: process.env.EMAIL_FROM!,
                  to: email,
                },
              });

              if (externalCustomerId) {
                await polar.createUsageEvent(
                  UsageEvent.EMAIL_SENT,
                  externalCustomerId,
                  {
                    product: Product.FORMS,
                    template,
                  },
                );
              }
            }),
          );

          console.info(
            "Job: Basestack Forms - Send Email - ✨ Email sent successfully! ✨",
          );
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
            `Job: Basestack Forms - Send Email - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
          );
        },
      },
    ),
  )
  .post(
    "/check-spam",
    serve<CheckDataForSpamPayload>(
      async (context) => {
        const { submissionId, data, userId, externalCustomerId } =
          context.requestPayload;

        console.info(
          `Job: Check Spam - Preparing to check data for spam: ${JSON.stringify(data)} with submission ID: ${submissionId}`,
        );

        await context.run("check-data-for-spam-step", async () => {
          const res = await ai.cfAiClient({
            model: ai.TextGenerationModel.LLAMA_3_8B_INSTRUCT,
            messages: ai.instructions.checkSpam(JSON.stringify(data)),
          });

          if (externalCustomerId) {
            await polar.createUsageEvent(
              UsageEvent.SPAM_CHECK,
              externalCustomerId,
              {
                product: Product.FORMS,
                submissionId,
                userId,
              },
            );
          }

          if (res.success) {
            console.info(
              `Job: Check Spam - Data successfully checked for: ${res.result.response}`,
            );

            const isSpam = JSON.parse(res.result.response).isSpam ?? false;

            if (isSpam) {
              console.info(
                `Job: Check Spam - The data is spam. Submission ID: ${submissionId}. Preparing to update the form Submission status on the DB.`,
              );

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
    ),
  )
  .post(
    "/send-data-to-external-webhook",
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

          if (externalCustomerId) {
            await polar.createUsageEvent(
              UsageEvent.WEBHOOK_TRIGGERED,
              externalCustomerId,
              {
                product: Product.FORMS,
              },
            );
          }

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
    ),
  );

export default jobsRoutes;
