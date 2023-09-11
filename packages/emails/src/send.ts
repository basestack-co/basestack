// Utils
import nodemailer from "nodemailer";

export interface SendEmailOptions {
  html: string;
}

export const sendEmail = async ({ html }: SendEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: "my_user",
      pass: "my_password",
    },
  });

  const options = {
    from: "you@example.com",
    to: "user@gmail.com",
    subject: "hello world",
    html,
  };

  await transporter.sendMail(options);
};
