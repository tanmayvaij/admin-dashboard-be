import nodemailer from "nodemailer";

export const sendTestEmail = async (to: string, subject: string, html: string) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"AdminDashboardBE App 👨‍💻" <no-reply@test.com>',
    to,
    subject,
    html,
  });

  console.log("🔗 Preview URL:", nodemailer.getTestMessageUrl(info));
};
