import { transporter } from "@/lib/mailer";

export const emailProvider = {
  async send(to: string, subject: string, message: string) {
    const response = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      text: message,
    });

    return {
      externalId: response.messageId,
      status: "SENT",
    };
  },
};