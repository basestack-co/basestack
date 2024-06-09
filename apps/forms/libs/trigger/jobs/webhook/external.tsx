import React from "react";
import { eventTrigger } from "@trigger.dev/sdk";
import { triggerClient, TriggerEventName } from "libs/trigger";
// Email
import { sendEmail, EmailTemplate } from "@basestack/emails";
import { render } from "@react-email/render";
// Utils
import { z } from "zod";

const template: { [key: string]: React.ElementType } = {
  "new-submission": EmailTemplate,
};

triggerClient.defineJob({
  id: "send-email",
  name: "Send email notification",
  version: "1.0.0",
  trigger: eventTrigger({
    name: TriggerEventName.SEND_EMAIL,
    schema: z.object({
      to: z.array(z.string().email()),
      subject: z.string(),
      template: z.string(),
    }),
  }),
  run: async (payload, io) => {
    await io.logger.info(
      `Preparing to send email to ${payload.to} with subject: ${payload.subject}`,
    );

    await io.runTask(
      "send-email",
      async () => {
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

      { name: "Send Email" },
    );

    await io.logger.info("✨ Email sent successfully! ✨");
  },
});