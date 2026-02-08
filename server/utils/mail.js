const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined,
  secure: process.env.SMTP_SECURE === 'true',
  auth: process.env.SMTP_USER
    ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    : undefined,
});

module.exports = async function sendAdminEmail({ to = process.env.ADMIN_EMAIL, subject = 'Notification', text = '', html }) {
  if (!to) return Promise.resolve();
  const msg = {
    from: process.env.EMAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com',
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(msg);
};
