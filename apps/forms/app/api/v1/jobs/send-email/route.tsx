// UpStash
import { serve } from "@upstash/qstash/nextjs";
import { Receiver } from "@upstash/qstash";
// Types
import React, { ElementType } from "react";
import type { SendEmailPayload } from "libs/qstash";
// Email
import { sendEmail, NewSubmissionEmailTemplate } from "@basestack/emails";
import { render } from "@react-email/render";

const templateList: { [key: string]: ElementType } = {
  "new-submission": NewSubmissionEmailTemplate,
};

export const POST = serve<SendEmailPayload>(
  async (context) => {
    const { to, subject, template, props } = context.requestPayload;

    console.info(`Preparing to send email to ${to} with subject: ${subject}`);
    console.info(`Email with the template ${template} with props: ${props}`);

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

      console.info("✨ Email sent successfully! ✨");
    });
  },
  {
    receiver: new Receiver({
      currentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY!,
      nextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY!,
    }),
  },
);
