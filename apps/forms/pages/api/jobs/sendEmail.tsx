import type { NextApiRequest, NextApiResponse } from "next";
import { verifySignature } from "@upstash/qstash/dist/nextjs";
// Email
import { sendEmail, EmailTemplate } from "@basestack/emails";
import { render } from "@react-email/render";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { to, subject } = req.body;

    console.info(`Preparing to send email to ${to} with subject: ${subject}`);

    await sendEmail({
      html: render(<EmailTemplate />),
      options: {
        subject,
        from: `Hello <${process.env.EMAIL_FROM}>`,
        to,
      },
    });

    console.info("✨ Email sent successfully! ✨");

    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
}

export default verifySignature(handler);
