// Email
import {
  InviteEmailTemplate,
  sendEmail,
  WelcomeEmailTemplate,
} from "@basestack/emails";
import { Product, UsageEvent } from "@basestack/utils";
// Vendors
import {
  polar,
  type SendEmailPayload,
  type SendDataToExternalWebhookPayload,
} from "@basestack/vendors";
import { render } from "@react-email/render";
// UpStash Workflow
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import type { ElementType } from "react";

const templateList: { [key: string]: ElementType } = {
  welcome: WelcomeEmailTemplate,
  invite: InviteEmailTemplate,
};

const jobsRoutes = new Hono()
  .post(
    "/send-email",
    serve<SendEmailPayload>(
      async (context) => {
        const { to, subject, template, externalCustomerId, props } =
          context.requestPayload;

        console.info(
          `Job: Basestack Uptime - Send Email - Preparing to send email to ${to} with subject: ${subject}`
        );
        console.info(
          `Job: Basestack Uptime - Send Email - Email with the template ${template} with props: ${JSON.stringify(props)}`
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
                  UsageEvent.UPTIME_NOTIFICATIONS,
                  externalCustomerId,
                  {
                    product: Product.UPTIME,
                    template,
                  }
                );
              }
            })
          );

          console.info(
            "Job: Basestack Uptime - Send Email - ✨ Email sent successfully! ✨"
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
            `Job: Basestack Uptime - Send Email - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `
          );
        },
      }
    )
  )
  .post(
    "/send-data-to-external-webhook",
    serve<SendDataToExternalWebhookPayload>(
      async (context) => {
        const { url, body, externalCustomerId } = context.requestPayload;

        console.info(
          `Job: Basestack Uptime - External Webhook - Preparing to send data to external webhook: ${url}`
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
              UsageEvent.UPTIME_TRIGGERS,
              externalCustomerId,
              {
                product: Product.UPTIME,
              }
            );
          }

          console.info(
            `Job: Basestack Uptime - External Webhook - Data sent to the external webhook with status: ${res.status}`
          );
        });

        console.info(
          "Job: Basestack Uptime - External Webhook - ✨ Data successfully sent to the external webhook ✨"
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
            `Job: Basestack Uptime - External Webhook - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `
          );
        },
      }
    )
  );

export default jobsRoutes;
