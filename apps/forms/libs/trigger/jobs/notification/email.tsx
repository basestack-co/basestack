import React from "react";
import { task, logger } from "@trigger.dev/sdk/v3";
// Email
import { sendEmail, EmailTemplate } from "@basestack/emails";
import { render } from "@react-email/render";

export interface SendEmailPayload {
  to: string[];
  subject: string;
  template: string;
}

const template: { [key: string]: React.ElementType } = {
  "new-submission": EmailTemplate,
};

export const sendEmailTask = task({
  id: "send-email",
  machine: {
    preset: "small-1x",
  },
  init: async (payload) => {
    logger.info(
      `Preparing to send email to ${payload.to} with subject: ${payload.subject}`,
    );
  },
  run: async (payload: SendEmailPayload) => {
    const Template = template[payload.template];

    await Promise.all(
      payload.to.map(async (email) => {
        await sendEmail({
          html: render(<Template />),
          options: {
            subject: payload.subject,
            from: process.env.EMAIL_FROM!,
            to: email,
          },
        });
      }),
    );
  },
  onSuccess: async () => {
    logger.info("✨ Email sent successfully! ✨");
  },
});
