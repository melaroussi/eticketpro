import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly db: DatabaseService) {}

  async sendEmail(to: string, subject: string, html: string): Promise<any> {
    try {
      const smtpConfig = await this.db.executeQuery(
        'SELECT host, port, secure, user, password, fromEmail FROM smtp_config WHERE id=1'
      );

      if (!smtpConfig || smtpConfig.length === 0) {
        throw new Error('SMTP settings are not configured in the database.');
      }

      const { host, port, secure, user, password, fromEmail } = smtpConfig[0];

      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(port),
        secure: secure === 1,
        auth: {
          user,
          pass: password,
        },
      });

      const info = await transporter.sendMail({
        from: `"e-Ticket Pro" <${fromEmail}>`,
        to,
        subject,
        html,
      });

      this.logger.log(`Email sent successfully: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      this.logger.error('Error sending email', error);
      return { success: false, error: error.message || error };
    }
  }
}
