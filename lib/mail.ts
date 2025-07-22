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
            We're thrilled to have you on board! Your journey to building and exploring real-time AI voice interview platforms—powered by intelligent voice agents—starts now.
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
            If you have any questions or need help, just reply to this email or visit our
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/help" style="color: blue; text-decoration: none;">Help Center</a>.
          </p>

          <p style="font-size: 14px;">
            by developers,<br/>
            The ${appName} Team
          </p>
  `;

  await transporter.sendMail({
    from: `"${appName} Team" <${process.env.EMAIL_SERVER_USER}>`,
    to,
    subject: `Welcome to ${appName}!`,
    html: htmlContent,
  });
}
