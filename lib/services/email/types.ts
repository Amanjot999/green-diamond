/**
 * EmailService — typed seam for transactional email (SPEC §10).
 * `ConsoleEmailService` backs it now; a real provider (Resend/Nodemailer) is
 * wired in Phase 6 without touching callers.
 */
export interface EmailMessage {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export interface SendResult {
  id: string;
  queued: boolean;
}

export interface EmailService {
  send(message: EmailMessage): Promise<SendResult>;
  sendOrderConfirmation(input: {
    to: string;
    orderNumber: string;
  }): Promise<SendResult>;
}
