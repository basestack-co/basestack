import { eventTrigger } from "@trigger.dev/sdk";
import { triggerClient, TriggerEventName } from "libs/trigger";
// Email
import { sendEmail, EmailTemplate } from "@basestack/emails";
import { render } from "@react-email/render";
// Utils
import { z } from "zod";

triggerClient.defineJob({
  id: "send-email",
  name: "Send email",
  version: "1.0.0",
  trigger: eventTrigger({
    name: TriggerEventName.SEND_EMAIL,
    schema: z.object({
      to: z.string(),
      subject: z.string(),
    }),
  }),
  run: async (payload, io, ctx) => {
    await io.logger.info(
      `Preparing to send email to ${payload.to} with subject: ${payload.subject}`,
    );

    await io.runTask(
      "send-email",
      async () => {
        await sendEmail({
          html: render(<EmailTemplate />),
          options: {
            subject: payload.subject,
            from: process.env.EMAIL_FROM!,
            to: payload.to,
          },
        });
      },

      { name: "Send Email" },
    );

    await io.logger.info("✨ Email sent successfully! ✨");
  },
});
