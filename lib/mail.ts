import nodemailer from "nodemailer";

interface SendWelcomeEmailParams {
  to: string;
  name: string;
  magicLink?: string;
}

export async function sendWelcomeEmail({ to, name, magicLink }: SendWelcomeEmailParams) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASS,
    },
  });

  const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "Our Platform";

  const htmlContent = `
          <p style="font-size: 16px; line-height: 1.5;">
            Hi <strong>${name}</strong>,<br/><br/>
              We're excited to have you on board! You're now ready to experience an intelligent chatbot powered by Google Gemini—built for natural, contextual conversations that feel truly human.
            </p>

          ${
            magicLink
              ? `
            <p style="font-size: 16px;">
              Click this link to sign in:
              <br/>
              <a href="${magicLink}" style="color:blue;">go to ${appName}</a>
            </p>
            `
              : ""
          }

          <p style="font-size: 16px; line-height: 1.5;">
            If you have any questions or need help, just reply to this email.
          </p>

          <p style="font-size: 14px;">
            by developer, soufian<br/>
          </p>
  `;

  await transporter.sendMail({
    from: `"${appName} Team" <${process.env.EMAIL_SERVER_USER}>`,
    to,
    subject: `Welcome to ${appName}!`,
    html: htmlContent,
  });
}
