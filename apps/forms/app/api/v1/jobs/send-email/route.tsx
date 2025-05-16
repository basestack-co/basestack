// UpStash
import { serve } from "@upstash/workflow/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import React, { ElementType } from "react";
import type { SendEmailPayload } from "@basestack/vendors";
// Email
import {
  sendEmail,
  NewSubmissionEmailTemplate,
  WelcomeEmailTemplate,
  AddProjectMemberEmailTemplate,
  InviteEmailTemplate,
} from "@basestack/emails";
import { render } from "@react-email/render";

const templateList: { [key: string]: ElementType } = {
  "new-submission": NewSubmissionEmailTemplate,
  welcome: WelcomeEmailTemplate,
  invite: InviteEmailTemplate,
  addFormMember: AddProjectMemberEmailTemplate,
};

export const { POST } = serve<SendEmailPayload>(
  async (context) => {
    const { to, subject, template, props } = context.requestPayload;

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
);
