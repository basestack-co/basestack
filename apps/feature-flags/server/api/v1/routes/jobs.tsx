// Email
import {
  AddProjectMemberEmailTemplate,
  InviteEmailTemplate,
  sendEmail,
  WelcomeEmailTemplate,
} from "@basestack/emails";
import { Product, UsageEvent } from "@basestack/utils";
// Vendors
import { polar, type SendEmailPayload } from "@basestack/vendors";
import { render } from "@react-email/render";
// UpStash Workflow
import { Receiver } from "@upstash/qstash";
import { serve } from "@upstash/workflow/hono";
import { Hono } from "hono";
import type { ElementType } from "react";

const templateList: { [key: string]: ElementType } = {
  welcome: WelcomeEmailTemplate,
  invite: InviteEmailTemplate,
  addProjectMember: AddProjectMemberEmailTemplate,
};

const jobsRoutes = new Hono().post(
  "/send-email",
  serve<SendEmailPayload>(
    async (context) => {
      const { to, subject, template, externalCustomerId, props } =
        context.requestPayload;

      console.info(
        `Job: Basestack Feature Flags - Send Email - Preparing to send email to ${to} with subject: ${subject}`,
      );
      console.info(
        `Job: Basestack Feature Flags - Send Email - Email with the template ${template} with props: ${JSON.stringify(props)}`,
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
                UsageEvent.FLAGS_EMAIL_SENT,
                externalCustomerId,
                {
                  product: Product.FLAGS,
                  template,
                },
              );
            }
          }),
        );

        console.info(
          "Job: Basestack Feature Flags - Send Email - ✨ Email sent successfully! ✨",
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
          `Job: Basestack Feature Flags - Send Email - status = ${JSON.stringify(failStatus)} response = ${JSON.stringify(failResponse)} headers = ${JSON.stringify(failHeaders)} context = ${JSON.stringify(context)} `,
        );
      },
    },
  ),
);

export default jobsRoutes;
