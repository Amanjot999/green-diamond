import type { EmailMessage, EmailService, SendResult } from "./types";

/**
 * ConsoleEmailService — used now. Logs instead of sending so the order/auth
 * flows work end-to-end with no email provider configured.
 *
 * TODO(email): add a ResendEmailService (Phase 6) selected when RESEND_API_KEY
 * is set, implementing the same interface.
 */
export class ConsoleEmailService implements EmailService {
  async send(message: EmailMessage): Promise<SendResult> {
    console.info(`[email:mock] → ${message.to} · ${message.subject}`);
    return { id: `mock_email_${crypto.randomUUID()}`, queued: true };
  }

  async sendOrderConfirmation(input: {
    to: string;
    orderNumber: string;
  }): Promise<SendResult> {
    return this.send({
      to: input.to,
      subject: `Your Green Diamond order ${input.orderNumber} is confirmed`,
      text: `Thank you for your order ${input.orderNumber}. We'll email you when it ships.`,
    });
  }
}
