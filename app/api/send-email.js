import nodemailer from 'nodemailer';
import excuteQuery from './msdb-connexion';

export default async function sendEmail({ to, subject, html }) {
  try {
    // 1. Fetch SMTP settings from database
    const smtpConfig = await excuteQuery({
      query: 'SELECT host, port, secure, user, password, fromEmail FROM smtp_config WHERE id=1',
      values: []
    });

    if (!smtpConfig || smtpConfig.length === 0) {
      throw new Error('SMTP settings are not configured in the database.');
    }

    const { host, port, secure, user, password, fromEmail } = smtpConfig[0];

    // 2. Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(port),
      secure: secure === 1,
      auth: {
        user: user,
        pass: password
      }
    });

    // 3. Send email
    const info = await transporter.sendMail({
      from: `"e-Ticket Pro" <${fromEmail}>`,
      to: to,
      subject: subject,
      html: html
    });

    console.log('Email sent successfully: ', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error.message || error };
  }
}
